import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, RefreshCw, CreditCard, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundFX';

const faqs = [
  {
    q: 'How do the promotional discounts and deals work?',
    a: 'Every product listed includes a live promotional discount between 25% and 33% off the manufacturer retail price. Discounts are calculated automatically and deducted directly in your final cart tally.',
    icon: CreditCard
  },
  {
    q: 'How fast is dispatch and delivery?',
    a: 'All orders are processed atomically in our inventory ledger and prepared for dispatch within 24 hours. Standard domestic delivery arrives in 2–4 business days with zero shipping fees.',
    icon: Truck
  },
  {
    q: 'Can I track my order live?',
    a: 'Yes! After checkout, a dedicated Order ID is generated. Enter this ID in the "Live Radar" tab to observe simulated sub-orbital telemetry updates from initial packaging to final-mile perimeter arrival.',
    icon: ShieldCheck
  },
  {
    q: 'What is your return and warranty policy?',
    a: 'We offer an unconditional 30-day return policy on all eligible items. Furthermore, all tech hardware, footwear, and accessories carry a minimum 2-year warranty with zero hassle replacement.',
    icon: RefreshCw
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    sound.playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="my-16 max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EC4186]/15 border border-[#EC4186]/40 text-xs font-mono font-bold text-white tracking-widest uppercase mb-3">
          <Sparkles size={13} className="text-[#EE544A]" /> Help & Information
        </div>
        <h2 className="text-3xl font-black text-white flex items-center justify-center gap-2.5">
          <HelpCircle size={28} className="text-[#EC4186]" /> Frequently Asked Questions
        </h2>
        <p className="text-xs font-mono text-gray-300 uppercase tracking-widest mt-1.5">
          Everything you need to know about our products, guarantees, and dispatch
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const Icon = faq.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl border backdrop-blur-2xl transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-gradient-to-b from-[#38124A]/90 to-[#22072e]/95 border-[#EC4186] shadow-[0_0_25px_rgba(236,65,134,0.3)]' 
                  : 'bg-[#280c35]/60 hover:bg-[#38124A]/70 border-[#EC4186]/30 hover:border-[#EE544A]/60'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl transition ${isOpen ? 'bg-[#EC4186] text-white shadow-md shadow-[#EC4186]/50' : 'bg-[#EC4186]/20 text-[#EC4186]'}`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-extrabold text-sm sm:text-base text-white tracking-wide">{faq.q}</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-[#EC4186] transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-200 leading-relaxed font-sans border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
