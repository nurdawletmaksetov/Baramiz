import { Container } from "../../container/container"
import Logo from "../../assets/logo.svg"
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {

    const handleTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <>
            <footer className="bg-gradient-to-r from-[#FFDE85] to-[#FFC65C] py-[60px]">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4">

                        <div className="w-full md:w-1/4">
                            <div className="flex items-center gap-3 mb-6">
                                <img src={Logo} alt="Baramiz Logo" className="h-10 w-auto" />
                            </div>
                            <div className="flex gap-4">
                                <SocialIcon icon={<FaFacebookF />} />
                                <SocialIcon icon={<FaTwitter />} />
                                <SocialIcon icon={<FaInstagram />} />
                                <SocialIcon icon={<FaYoutube />} />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-[16px] uppercase mb-5 text-black">Короткие ссылки</h3>
                            <ul className="flex flex-col gap-3 text-[#333] font-medium">
                                <NavLink onClick={handleTopClick} to={"/"} className="hover:text-black cursor-pointer">Главная</NavLink>
                                <NavLink onClick={handleTopClick} to={"/about"} className="hover:text-black cursor-pointer">О нас</NavLink>
                                <NavLink onClick={handleTopClick} to={"/routes"} className="hover:text-black cursor-pointer">Маршруты</NavLink>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-[16px] uppercase mb-5 text-black">Ссылка на справку</h3>
                            <ul className="flex flex-col gap-3 text-[#333] font-medium">
                                <li onClick={handleTopClick} className="hover:text-black cursor-pointer">Как это работает</li>
                                <li onClick={handleTopClick} className="hover:text-black cursor-pointer">Видеоурок</li>
                                <li onClick={handleTopClick} className="hover:text-black cursor-pointer">FAQ</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-[16px] uppercase mb-5 text-black">Короткие ссылки</h3>
                            <ul className="flex flex-col gap-3 text-[#333] font-medium">
                                <li onClick={handleTopClick} className="hover:text-black cursor-pointer">Google Play Store</li>
                                <li onClick={handleTopClick} className="hover:text-black cursor-pointer">Apple App Store</li>
                                <li onClick={handleTopClick} className="hover:text-black cursor-pointer">Download Directly</li>
                            </ul>
                        </div>

                    </div>
                </Container>
            </footer>
        </>
    )
}

const SocialIcon = ({ icon }) => {
    return (
        <div className="w-10 h-10 bg-[#F77F00] text-white rounded-full flex items-center justify-center text-[18px] cursor-pointer hover:bg-[#D66C00] transition-colors duration-300">
            {icon}
        </div>
    )
}

export default Footer