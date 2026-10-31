import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShoppingBag, ArrowRightLeft, Tag } from 'lucide-react';
import { sound } from '../utils/soundFX';

export default function ProductCard({ product, onAddToCart, onAddToCompare }) {
  const [exploded, setExploded] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  let specs = {};
  try {
    specs = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs || {};
  } catch (_) {
    specs = {};
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 15, y: x * 15 });
  };

  const handleToggleExplode = () => {
    sound.playExplode();
    setExploded(!exploded);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 240);
  };

  const handleAddCart = () => {
    sound.playGlitterChime();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 280);
    onAddToCart(product);
  };

  const originalPrice = product.original_price || (product.price * 1.35).toFixed(2);
  const discount = product.discount_percent || Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <motion.div
      onMouseEnter={() => sound.playHover()}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        x: isShaking ? [0, -5, 5, -3, 3, 0] : 0
      }}
      transition={{ type: 'spring', damping: 14, stiffness: 180 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative rounded-3xl bg-gradient-to-b from-[#2d093b]/90 via-[#21062c]/85 to-[#13031a]/95 border border-[#EC4186]/35 backdrop-blur-2xl p-6 flex flex-col justify-between hover:border-[#EE544A] hover:shadow-[0_0_35px_rgba(236,65,134,0.4)] transition-all duration-300"
    >
      {/* Top Header Tag Ribbon */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EC4186]/15 border border-[#EC4186]/40 text-[10px] font-mono tracking-widest uppercase text-white font-bold">
          <Tag size={11} className="text-[#EE544A]" /> {product.category}
        </span>
        <div className="flex items-center gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white text-[9px] font-mono font-black shadow-md tracking-wider">
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-lg bg-white/10 text-[#FFE4E6] border border-white/20 text-[10px] font-mono font-black">
            -{discount}%
          </span>
        </div>
      </div>

      {/* Original High-Resolution Product Photography */}
      <div
        className="my-4 relative overflow-hidden rounded-2xl bg-black/40 border border-[#EC4186]/30 shadow-inner group-hover:border-[#EC4186] transition-colors"
        style={{ transform: exploded ? 'translateZ(45px) scale(1.03)' : 'translateZ(10px)', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <img
          src={product.image_url}
          alt={product.title}
          loading="lazy"
          className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13031a]/70 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Product Titles & Exploded Specs */}
      <div style={{ transform: exploded ? 'translateZ(30px)' : 'translateZ(0px)', transition: 'transform 0.3s ease' }}>
        <h3 className="text-base font-extrabold text-white group-hover:text-[#EC4186] transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-200 mt-1 line-clamp-2 leading-relaxed">{product.description}</p>

        {exploded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-2xl bg-[#38124A]/95 border border-[#EC4186]/50 grid grid-cols-2 gap-2 text-[11px] font-mono text-white shadow-xl"
          >
            {Object.entries(specs).map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <span className="text-[#EE544A] uppercase text-[9px] font-bold">{k}</span>
                <span className="font-extrabold text-white truncate">{v}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Pricing & Interactive Buy Action */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between" style={{ transform: 'translateZ(25px)' }}>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono line-through text-gray-400">${Number(originalPrice).toFixed(2)}</span>
            <span className="text-[10px] font-mono font-extrabold text-[#EE544A] uppercase">SAVE ${(originalPrice - product.price).toFixed(2)}</span>
          </div>
          <span className="text-2xl font-black text-white">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { sound.playClick(); onAddToCompare(product); }}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:text-[#EC4186] transition"
            title="Add to Compare"
          >
            <ArrowRightLeft size={16} />
          </button>
          <button
            onClick={handleToggleExplode}
            className={`p-2.5 rounded-xl border transition ${exploded ? 'bg-[#EC4186] text-white border-white shadow-lg shadow-[#EC4186]/50' : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'}`}
            title="Inspect Specifications"
          >
            <Layers size={16} />
          </button>
          <button
            onClick={handleAddCart}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#EC4186] via-[#EE544A] to-[#EC4186] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#EC4186]/45 hover:scale-105 active:scale-95"
          >
            <ShoppingBag size={14} /> Buy
          </button>
        </div>
      </div>
    </motion.div>
  );
}
