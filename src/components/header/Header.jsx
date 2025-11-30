import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { Container } from '../../container/container'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks';
import { Languages, MenuIcon } from 'lucide-react';
import { Button, Menu } from '@mantine/core';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const isMedium = useMediaQuery("(min-width: 1024px)");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const languages = [
        { value: "kk", label: "QARAQALPAQ" },
        { value: "ru", label: "РУССКИЙ" },
        { value: "en", label: "ENGLISH" },
        { value: "uz", label: "UZBEK" },
    ];

    return (
        <>
            <header
                className={`
                    w-full fixed top-0 left-0 z-50 transition-all duration-300 
                    ${isScrolled ? "bg-linear-to-r from-[#FFB481] to-[#F46A2F] shadow-md py-3 sm:py-4" : "bg-transparent py-4 sm:py-8"}
                `}
            >
                <Container>

                    <div className='flex items-center justify-between'>
                        <NavLink onClick={handleTopClick} to={"/"}>
                            <img className='max-w-[120px] sm:max-w-[150px] w-full' src={Logo} />
                        </NavLink>

                        {isMedium ? (
                            <>
                                <div className='flex items-center font-semibold text-[14px] text-text-black sm:gap-[30px] md:gap-[70px]'>
                                    <NavLink onClick={handleTopClick} to={"/"}>Главная</NavLink>
                                    <NavLink onClick={handleTopClick} to={"/about"}>О нас</NavLink>
                                    <NavLink onClick={handleTopClick} to={"/routes"}>Маршруты</NavLink>
                                </div>
                                <div className='flex items-center gap-2.5'>
                                    <Menu align="center" shadow="md" width={140}>
                                        <Menu.Target>
                                            <Button variant="transparent" p={4}>
                                                <Languages color="#000" size={20} />
                                            </Button>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            {languages.map((lang) => (
                                                <Menu.Item
                                                    key={lang.value}
                                                    onClick={() => {
                                                        i18n.changeLanguage(lang.value);
                                                        onLanguageChange(lang.value);
                                                    }}
                                                >
                                                    {lang.label}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Dropdown>
                                    </Menu>
                                    <button onClick={handleTopClick} className='font-semibold py-2.5 px-3.5 rounded-[30px] border border-yellowred text-text-black'>
                                        Войти
                                    </button>
                                    <button onClick={handleTopClick} className='font-semibold py-2.5 px-3.5 rounded-[30px] border bg-yellowred text-white'>
                                        Регистрация
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <MenuIcon />
                            </div>
                        )}
                    </div>
                </Container>
            </header>

            <div className='h-[100px]'></div>
        </>
    );
};

export default Header;
