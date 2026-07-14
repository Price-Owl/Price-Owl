const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const ProductUrlSchema = require("../models/productUrl");
const User = require("../models/User");
const Tracking = require("../models/Tracking");

async function submitUrlController(req, res) {
    try {
        // 1. Fetch user details from middleware
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid user"
            });
        }

        const { productUrl } = req.body;
        if (!productUrl) {
            return res.status(400).json({
                success: false,
                message: "Please provide a product URL."
            });
        }

        // 2. Validate URL support
        const isAmazon = productUrl.includes("amazon.");
        const isFlipkart = productUrl.includes("flipkart.");
        if (!isAmazon && !isFlipkart) {
            return res.status(400).json({
                success: false,
                message: "Only Amazon and Flipkart URLs are supported.",
            });
        }

        // 3. Track current price & details
        const productData = await currentPriceTrackController(productUrl);
        if (!productData || !productData.price) {
            return res.status(422).json({
                success: false,
                message: "Failed to retrieve the product price. The page structure might have changed or access was blocked."
            });
        }

        //check if the link already submitted by the user or the another user 
        //producturl schema me unique products links add honge, taaki cronjob repititive task na kare
        //har 12 ghante me ek baar pure producturl schema pe web scrapping kre and jis jis user ke list me ye links honge un sb ko email bhej denge
        const existingProduct = await ProductUrlSchema.findOne({productUrl:productUrl});
        if(existingProduct){
            await Tracking.create({
                userId: user._id,
                productId: existingProduct._id,
            })
            if(productData.price<existingProduct.currentPrice){
                await ProductUrlSchema.findOneAndUpdate({productUrl},
                    {
                        currentPrice: productData.price
                    }
                )
            }
        }
        else{
            // 4. Save to Database (Including the title and price we just scraped)
            const newProductTrack = await ProductUrlSchema.create({
            productUrl: productUrl,
            // Assuming your schema supports these fields. If not, edit accordingly:
            productName: productData.title,
            currentPrice: productData.price,
            });
            await ProductUrlSchema.findOneAndUpdate(
                {productUrl},
                {
                    $push: {price: productData.price}
                }
            )
            await User.findByIdAndUpdate(user._id, {
                $push: { urlsId: newProductTrack._id },
            });
        }

        return res.status(200).json({
            success: true,
            message: "URL submitted successfully! Now tracking price drops.",
            data: {
                title: productData.title,
                price: productData.price
            }
        });
    } catch (error) {
        console.error("Submit URL Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
} 

const currentPriceTrackController = async (productUrl) => {
  let browser;
  try {
    // Launch browser (headless: true for background API execution)
    browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Keep if pointing to local Chrome, remove if using Puppeteer's bundled Chromium
      headless: "new", // "new" or true (highly recommended for production servers)
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ]
    });

    const page = await browser.newPage();

    // Set a modern User-Agent to help bypass basic bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });
console.log("Opening:", productUrl);

await page.goto(productUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
});
    await page.goto(productUrl, {
        waitUntil: "networkidle2",
        timeout: 60000 // 60s timeout limit
    });

    // Extract title and price dynamically using standard schema patterns, meta tags, or css fallbacks
    const productData = await page.evaluate(() => {
        const cleanPrice = (val) => {
            if (!val) return null;
            // Strip currency symbols, commas, spaces and parse to number
            const cleaned = val.replace(/[^\d.]/g, '');
            const num = parseFloat(cleaned);
            return isNaN(num) ? null : num;
        };

        const cleanTitle = (text) => {
            return text ? text.trim().replace(/\s+/g, ' ') : null;
        };

        // --- METHOD 1: Parse JSON-LD (Search engine markup, most reliable) ---
        const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
        for (const script of jsonLdScripts) {
            try {
                const data = JSON.parse(script.textContent);

                // Helper to search recursively for '@type: Product' in JSON-LD objects
                const findProductNode = (obj) => {
                    if (!obj || typeof obj !== 'object') return null;
                    if (Array.isArray(obj)) {
                        for (const item of obj) {
                            const found = findProductNode(item);
                            if (found) return found;
                        }
                    }
                    if (obj['@type'] === 'Product') return obj;
                    if (obj['@graph']) return findProductNode(obj['@graph']);
                    
                    for (const key of Object.keys(obj)) {
                        const found = findProductNode(obj[key]);
                        if (found) return found;
                    }
                    return null;
                };

                const productNode = findProductNode(data);
                if (productNode) {
                    let title = productNode.name;
                    let price = null;
                    if (productNode.offers) {
                        const offers = Array.isArray(productNode.offers) ? productNode.offers : [productNode.offers];
                        for (const offer of offers) {
                            if (offer.price) {
                                price = cleanPrice(offer.price.toString());
                                break;
                            }
                        }
                    }
                    if (price) return { title: cleanTitle(title), price };
                }
            } catch (e) { /* ignore JSON parsing errors */ }
        }

        // --- METHOD 2: Parse OpenGraph / Microdata HTML Meta Tags ---
        const metaPrice = document.querySelector('meta[property="og:price:amount"]') || 
                          document.querySelector('meta[property="product:price:amount"]') ||
                          document.querySelector('meta[itemprop="price"]');
        
        const metaTitle = document.querySelector('meta[property="og:title"]') ||
                          document.querySelector('title');

        let extractedPrice = metaPrice ? cleanPrice(metaPrice.getAttribute('content')) : null;
        let extractedTitle = metaTitle ? cleanTitle(metaTitle.getAttribute('content') || metaTitle.textContent) : null;

        if (extractedPrice && extractedTitle) {
            return { title: extractedTitle, price: extractedPrice };
        }

        // --- METHOD 3: Fallback Store-Specific Selectors ---
        let title = null;
        let price = null;
        const currentUrl = window.location.href;

        if (currentUrl.includes('amazon.')) {
            const titleEl = document.querySelector('#productTitle');
            if (titleEl) title = titleEl.textContent;

            const priceEl = document.querySelector('.a-price-whole') || 
                            document.querySelector('#priceblock_ourprice') || 
                            document.querySelector('#priceblock_dealprice') ||
                            document.querySelector('.a-price .a-offscreen');
            if (priceEl) price = cleanPrice(priceEl.textContent);
        } else if (currentUrl.includes('flipkart.')) {
            const titleEl = document.querySelector('.VU-ZEc') || 
                            document.querySelector('.B_NuCI') || 
                            document.querySelector('h1');
            if (titleEl) title = titleEl.textContent;

            const priceEl = document.querySelector('.Nx9nXM') || 
                            document.querySelector('._30jeq3._16Jk6d') || 
                            document.querySelector('._30jeq3');
            if (priceEl) price = cleanPrice(priceEl.textContent);
        }

        return {
            title: cleanTitle(title),
            price: price
        };
    });

    console.log("Tracked Product Details:", productData);
    return productData;

  } catch (error) {
    console.error("Price Track Error:", error);
    return null;
  } finally {
    // ALWAYS close the browser in the finally block to prevent RAM leaks
    if (browser) {
      await browser.close();
    }
  }
};

const getAllMyLinksController = async (req, res) => {
    try {
        // Optimized: Query directly using req.user.id to avoid redundant User.findById lookup
        const user=await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        const allLinks = await User.findById(req.user.id).select("urls");
        return res.status(200).json({
            success: true,
            message: "Fetched all your links successfully.",
            data: allLinks.urls
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

module.exports = {
    submitUrlController,
    getAllMyLinksController,
    currentPriceTrackController
};