import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { sound } from '../utils/soundFX';

export default function AuraBot({ onSelectCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Greetings! I am Aura AI, your shopping assistant. Looking for discounts, delivery details, or product recommendations across our 6 domains?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    sound.playClick();
    const userText = input.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      sound.playGlitterChime();
      let botReply = "I can guide you through our product catalog, flash discounts, or order status radar tracking. What domain are you interested in?";
      const lower = userText.toLowerCase();

      if (lower.includes('discount') || lower.includes('offer') || lower.includes('sale') || lower.includes('coupon')) {
        botReply = 'All products currently feature instant promotional discounts between 25% and 33% off! Look for the red "FLASH SALE" and "HOT DEAL" badges on items.';
      } else if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('track')) {
        botReply = 'Orders are dispatched within 24 hours. Once your order is confirmed, open the "Live Radar" tab in the top navigation to view simulated real-time telemetry!';
      } else if (lower.includes('electronics') || lower.includes('headphone') || lower.includes('keyboard')) {
        botReply = 'Our Electronics collection features the bestselling Aura Pro Wireless ANC Headphones and RGB Ergonomic Keyboards. Would you like me to switch to Electronics?';
        if (onSelectCategory) onSelectCategory('Electronics');
      } else if (lower.includes('gaming') || lower.includes('mouse')) {
        botReply = 'Check out the AeroBlade 58g Gaming Mouse and Extended Micro-Weave Mat in the Gaming domain!';
        if (onSelectCategory) onSelectCategory('Gaming');
      } else if (lower.includes('return') || lower.includes('refund') || lower.includes('warranty')) {
        botReply = 'We offer a hassle-free 30-day money-back guarantee and a minimum 2-year warranty on all tech hardware.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 450);
  };

  return (
    <>
      {/* Floating Emerald AI Trigger */}
      <button
        onClick={() => { sound.playClick(); setIsOpen(!isOpen); }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-black shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
      >
        <Bot size={22} className="group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-mono font-bold uppercase hidden md:inline">Aura AI Support</span>
      </button>

      {/* Slide-out Interactive Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm h-[480px] bg-[#03140f]/95 border border-emerald-500/40 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 bg-emerald-950/60 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-400 text-black flex items-center justify-center font-black">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Aura Concierge AI</h3>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE SUPPORT
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-black font-medium rounded-tr-none'
                      : 'bg-white/10 text-emerald-100 border border-emerald-500/20 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-emerald-500/20 bg-black/40 flex gap-2">
            <input
              type="text"
              placeholder="Ask about deals, products, shipping..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-400 font-mono"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-emerald-400 hover:bg-emerald-300 text-black font-bold rounded-xl transition"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
