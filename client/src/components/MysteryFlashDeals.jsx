import { useState, useEffect } from 'react';
import { Gift, Sparkles, Timer, Flame, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundFX';

export default function MysteryFlashDeals({ onApplyMysteryDiscount }) {
  const [timeLeft, setTimeLeft] = useState(43200); // 12 hours
  const [claimed, setClaimed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [revealedCode, setRevealedCode] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 43200)), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const openBox = () => {
    sound.playGlitterChime();
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
    setClaimed(true);
    setRevealedCode('AURAVIP30');
    if (onApplyMysteryDiscount) onApplyMysteryDiscount(0.30);
  };

  return (
    <>
      {/* Sleek Countdown Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#38124A] via-[#EC4186]/30 to-[#EE544A]/40 border border-[#EC4186]/40 p-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EC4186] text-white flex items-center justify-center font-black animate-pulse shadow-lg shadow-[#EC4186]/50">
              <Flame size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-wide">LIGHTNING CLEARANCE DROPS</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#EE544A] text-white font-bold">LIMITED TIME</span>
              </div>
              <p className="text-xs text-gray-300">Special tiered discounts active across all departments. Instant cart application.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-white text-xs font-bold bg-[#1e0728]/80 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
              <Timer size={15} className="text-[#EC4186]" />
              <span>ENDS IN:</span>
              <span className="text-[#EE544A] text-sm font-black">{hours}:{minutes}:{seconds}</span>
            </div>

            <button
              onClick={() => { sound.playClick(); setModalOpen(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 transition shadow-lg shadow-[#EC4186]/40 hover:scale-105 active:scale-95"
            >
              <Gift size={15} /> {claimed ? 'Coupon Unlocked' : 'Mystery Perk'}
            </button>
          </div>
        </div>
      </div>

      {/* Mystery Reward Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#280c35] border border-[#EC4186]/60 p-6 shadow-2xl relative text-center">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EC4186] to-[#EE544A] mx-auto flex items-center justify-center text-white mb-4 shadow-[0_0_25px_rgba(236,65,134,0.6)]">
              <Sparkles size={28} />
            </div>

            <h3 className="text-xl font-black text-white mb-1">Aura Secret Voucher</h3>
            <p className="text-xs text-gray-300 mb-6">Open your daily lucky container to receive an extra promotional voucher discount.</p>

            {!claimed ? (
              <button
                onClick={openBox}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition"
              >
                Reveal My Mystery Reward
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-white/5 border border-[#EC4186]/40 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#EE544A] font-bold block">ACTIVE REWARD CODE</span>
                <div className="text-2xl font-black font-mono tracking-widest text-[#FFFFFF]">{revealedCode}</div>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <Check size={14} /> Applied an extra 30% discount to all orders!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
