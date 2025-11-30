import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { FloatingAiAssistant } from "../components/FloatingAiAssistant/FloatingAiAssistant"

const Layout = () => {
    return (
        <div
            style={{
                background: "var(--color-primary)"
            }}
        >
            <Header />
            <Outlet />
            <Footer />
            <FloatingAiAssistant />
        </div>
    )
}

export default Layout