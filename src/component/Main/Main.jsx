import React from "react";
import { useContext, useRef, useEffect } from "react";
import './Main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {

    const {onSent, loading, messages, setInput, input} = useContext(Context)
    const listRef = useRef(null);

    useEffect(() => {
        // scroll to bottom when messages change
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSent();
        }
    }

    const sampleCards = [
        'Suggest beautiful places to see on an upcoming road trip',
        'Briefly summarize this concept: urban planning',
        'Brainstorm team bonding activities for our work retreat',
        'Improve the readability of the following code'
    ];

    return(
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User avatar" />
            </div>
            <div className="main-container">

                <div className="chat-area">
                    <div className="messages" ref={listRef}>
                        {messages.length === 0 && (
                            <div className="greet">
                                <p><span>Hello, Dev.</span></p>
                                <p>How can I help you today?</p>
                                <div className="cards">
                                    {sampleCards.map((text, idx) => (
                                        <div key={idx} className="card" onClick={() => setInput(text)}>
                                            <p>{text}</p>
                                            <img src={assets.compass_icon} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((m) => (
                            <div key={m.id} className={`bubble ${m.role === 'user' ? 'user' : 'assistant'}`}>
                                {m.role === 'assistant' ? <img src={assets.gemini_icon} alt="assistant" /> : <img src={assets.user_icon} alt="user" />}
                                <div className="bubble-content" dangerouslySetInnerHTML={{__html: m.content}} />
                            </div>
                        ))}
                    </div>

                    <div className="main-bottom">
                        <div className="search-box">
                            <textarea onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)} value={input} placeholder="Enter prompt here" />
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="Send" /> : null}
                            </div>
                        </div>
                        <p className="bottom-info">
                            Gemini may display inaccurate info, including about people, so double-check its responses.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Main;