import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { FloatingAiAssistant } from "../components/FloatingAiAssistant/FloatingAiAssistant"
import { useMediaQuery } from "@mantine/hooks"

const Layout = () => {
    const isMedium = useMediaQuery("(min-width: 768px)");
    return (
        <div
            style={{
                background: "var(--color-primary)"
            }}
        >
            <Header />
            <Outlet />
            <Footer />
            {isMedium && <FloatingAiAssistant />}
        </div>
    )
}

export default Layout