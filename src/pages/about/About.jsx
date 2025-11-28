import { Container } from "../../container/container"
import Traveller from "../../assets/picture.png"
import Baggage from "../../assets/baggage.svg"
import Book from "../../assets/book.svg"
import Card from "../../assets/card.svg"

const About = () => {
    return (
        <>
            <div className="h-screen">
                <Container>
                    <section>
                        <div>
                            <h1 className="pb-8 text-black text-center font-semibold text-[36px]">О проекте</h1>
                            <div className="flex gap-[75px]">
                                <div className="w-[50%]">
                                    <img src={Traveller} className="" />
                                </div>
                                <div className="flex w-[50%] flex-col justify-center gap-[26px]">
                                    <h3 className="text-[36px] text-black font-medium">
                                        Сервис, созданный для того,
                                        чтобы туристы могли легко путешествовать
                                        по региону и находить самые интересные
                                        места без гида.
                                    </h3>
                                    <p className="text-text-gray">
                                        Мы верим, что Каракалпакстан — уникальный
                                        регион с культурой, природой и историей.
                                        Мы сделали сервис, который помогает открыть его всем
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <div className="p-1 bg-secondary-bg rounded-full">
                                            <img src={Baggage} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        </>
    )
}

export default About