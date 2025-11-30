import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Routes from "../pages/routes/Routes";
import CreateRoute from "../pages/createRoute/CreateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/routes",
                element: <Routes />
            },
            {
                path: "/routes/:id",
                element: <CreateRoute />
            },
        ]
    }
])