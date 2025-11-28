import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"

const Layout = () => {
    return (
        <div
            style={{
                background: "var(--color-primary)"
            }}
        >
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout