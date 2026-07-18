FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 10000

# Server file ka naam check kar lena. Agar main file server.js ki jagah index.js hai toh "index.js" likhein
CMD ["node", "server.js"]