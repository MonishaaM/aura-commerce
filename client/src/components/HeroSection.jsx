import { Sparkles, ArrowRight, ShieldCheck, Zap, Star, TrendingUp } from 'lucide-react';
import { sound } from '../utils/soundFX';

export default function HeroSection({ onExploreCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="relative rounded-3xl overflow-hidden border border-[#EC4186]/35 bg-gradient-to-br from-[#38124A]/90 via-[#22072e]/80 to-[#12031a]/95 p-8 md:p-14 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* Ambient Top Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#EC4186]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#EE544A]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EC4186]/15 border border-[#EC4186]/40 text-xs font-mono font-bold text-white tracking-widest uppercase">
              <Zap size={14} className="text-[#EE544A]" />
              <span>THE 2026 SIGNATURE COLLECTION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
              Design That Inspires. <br />
              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#EC4186] to-[#EE544A] bg-clip-text text-transparent">
                Products Built for Everyday Life.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl font-sans">
              Discover authentic essentials engineered for performance, comfort, and style. From studio-grade acoustics and everyday apparel to ergonomic work living and wellness gear.
            </p>

            {/* Quick-Hop Sector Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              {['Electronics', 'Fashion', 'Footwear', 'Home', 'Fitness', 'Gaming', 'Kitchen'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { sound.playClick(); onExploreCategory(cat); }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-[#EC4186] hover:to-[#EE544A] hover:text-white border border-white/15 text-xs font-mono uppercase tracking-wider transition-all duration-200"
                >
                  {cat} →
                </button>
              ))}
            </div>
          </div>

          {/* Right Live Trust & Quality Panel */}
          <div className="lg:col-span-4 bg-[#1a0524]/90 border border-[#EC4186]/40 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300">CURATED STANDARDS</span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                <Star size={14} className="fill-amber-400" /> 4.9 / 5.0
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#EC4186]/20 text-[#EC4186]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2-Year Official Warranty</h4>
                  <p className="text-[11px] text-gray-400">All electronics & hardware covered.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#EE544A]/20 text-[#EE544A]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Free Express Dispatch</h4>
                  <p className="text-[11px] text-gray-400">Same-day packaging on all orders.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                OVER 14,000+ VERIFIED DELIVERIES COMPLETED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
