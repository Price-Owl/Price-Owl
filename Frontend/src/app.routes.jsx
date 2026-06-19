import {createBrowserRouter} from "react-router";
import Home from "./pages/Home";
import SubmitUrl from "./pages/SubmitUrl";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/submit-url",
        element: <SubmitUrl/>
    }
])