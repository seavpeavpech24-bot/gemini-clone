import { createContext, useState } from "react";
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [loading, setLoading] = useState(false);
    // messages: array of { id, role: 'user'|'assistant', content: string }
    const [messages, setMessages] = useState([]);

    const escapeHtml = (unsafe) => {
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    }

    const formatResponseToHtml = (text) => {
        if (!text) return "";
        // Basic formatting: preserve newlines and simple * separators
        let escaped = escapeHtml(text);
        // Convert double-asterisk groups to line breaks (preserve content)
        escaped = escaped.split("**").join("<br>");
        // Convert single asterisk to a smaller break
        escaped = escaped.split("*").join("<br>");
        // Convert newline characters
        escaped = escaped.split("\n").join("<br>");
        return escaped;
    }

    const newChat = () => {
        setLoading(false)
        setMessages([])
    }

    const onSent = async (prompt) => {
        // determine content
        const content = prompt !== undefined ? prompt : input;
        if (!content || content.trim() === "") return;

        // push user message
        const userMsg = { id: Date.now() + '-u', role: 'user', content };
        setMessages(prev => [...prev, userMsg]);

        // add to prevPrompts when user typed
        if (prompt === undefined) {
            setPrevPrompts(prev=>[...prev, content]);
        }

        setRecentPrompt(content);
        setLoading(true);
        setInput("");

        // create assistant message placeholder
        const assistantId = Date.now() + '-a';
        const assistantMsg = { id: assistantId, role: 'assistant', content: '' };
        setMessages(prev => [...prev, assistantMsg]);

        try {
            const responseText = await run(content);
            // format to safe HTML
            const formatted = formatResponseToHtml(responseText);

            // typewriter-like append word by word
            const words = formatted.split(' ');
            for (let i = 0; i < words.length; i++) {
                const next = words[i] + (i === words.length - 1 ? '' : ' ');
                // schedule each word
                ((idx, chunk) => {
                    setTimeout(() => {
                        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + chunk } : m));
                    }, 50 * idx);
                })(i, next);
            }

            // after all words scheduled, clear loading after full delay
            setTimeout(() => {
                setLoading(false);
            }, 50 * words.length + 100);

        } catch (err) {
            console.error('AI request failed', err);
            // update assistant message with error
            setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: 'Error: failed to load response.' } : m));
            setLoading(false);
        }
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        loading,
        messages,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;