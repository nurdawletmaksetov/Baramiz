import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { Container } from '../../container/container'


const Header = () => {
    return (
        <>
            <header>
                <Container>
                    <div className='flex items-center py-8 justify-between'>
                        <div>
                            <img src={Logo} />
                        </div>
                        <div className='flex items-center font-semibold text-[14px] text-text-black gap-[70px]'>
                            <NavLink to={"/"}>Главная</NavLink>
                            <NavLink to={"/about"}>О нас</NavLink>
                            <NavLink to={"/routes"}>Маршруты</NavLink>
                        </div>
                        <div className='flex gap-2.5'>
                            <button className='font-semibold py-2.5 px-3.5 rounded-[30px] border border-yellowred text-text-black'>Войти</button>
                            <button className='font-semibold py-2.5 px-3.5 rounded-[30px] border bg-yellowred text-white'>Регистрация</button>
                        </div>
                    </div>
                </Container>
            </header>
        </>
    )
}

export default Header