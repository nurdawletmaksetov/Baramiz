import { useState } from "react";
import "./AiChatBot.css";
import { motion } from "motion/react";

const GEMINI_API_KEY = "AIzaSyDT8IuIlO4Y1NK-AaivgQ5MTRXLxJfutJM";

export default function BaramizChat() {
    const [messages, setMessages] = useState([{
        role: "assistant", content: "Salom! Qayerga sayohat qilmoqchisiz?",
    },]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: "user", content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

            const contents = newMessages.map((m) => ({
                role: m.role === "assistant" ? "model" : m.role,
                parts: [{ text: m.content }],
            }));

            const res = await fetch(GEMINI_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gemini-2.5-flash",
                    contents: contents,
                }),
            });

            const data = await res.json();

            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Uzr, hozir javob berish imkoni yo'q.";

            if (data.error) {
                throw new Error(data.error.message || "Gemini API dan javob olishda xatolik.");
            }

            setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, {
                role: "assistant", content: "Xatolik yuz berdi. Keyinroq urinib ko‘ring: " + err.message
            },]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="page-bg">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, scale: .9 },
                    visible: { opacity: 1, scale: 1 },
                }}
                className="chat-card"
            >
                <div className="chat-header">
                    <div className="chat-logo">
                        <span className="chat-logo-text">Baramiz AI</span>
                    </div>
                    <div className="chat-header-text">
                        Sizga yordam berishga tayyor
                    </div>
                </div>

                <div className="chat-body">
                    {messages.length === 0 ? (<SkeletonState />) : (<div className="messages">
                        {messages.map((m, i) => (<div
                            key={i}
                            className={`message-row ${m.role === "user" ? "message-row-user" : "message-row-ai"}`}
                        >
                            <div
                                className={`message-bubble ${m.role === "user" ? "bubble-user" : "bubble-ai"}`}
                            >
                                {m.content}
                            </div>
                        </div>))}

                        {loading && (<div className="message-row message-row-ai">
                            <div className="message-bubble bubble-ai bubble-loading">
                                ...
                            </div>
                        </div>)}
                    </div>)}
                </div>

                <div className="chat-input-wrapper">
                    <div className="chat-input-bar">
                        <input
                            className="chat-input"
                            placeholder="Qayerga sayohat qilmoqchisiz."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="chat-send-btn"
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                        >
                            <span className="chat-send-arrow">➤</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>);
}

function SkeletonState() {
    return (<div className="skeleton-wrap">
        <div className="skeleton-icon">✨</div>
        <div className="skeleton-row-group">
            <div className="skeleton-row" />
            <div className="skeleton-row" />
            <div className="skeleton-row wide" />
        </div>
    </div>);
}