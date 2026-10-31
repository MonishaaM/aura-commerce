import { X, ArrowRightLeft } from 'lucide-react';

export default function ComparisonDock({ items, onRemove, onClear }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0e1424]/95 border border-cyan-500/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 max-w-4xl w-[92%]">
      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm shrink-0">
        <ArrowRightLeft size={18} />
        <span>Compare ({items.length}/3)</span>
      </div>

      <div className="flex items-center gap-3 flex-1 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white shrink-0">
            <span className="truncate max-w-[120px] font-medium">{item.title}</span>
            <span className="text-cyan-300 font-bold">${item.price}</span>
            <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-400 transition">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <button
          onClick={() => alert(`Comparison Matrix:\n\n` + items.map(i => `• ${i.title} - $${i.price} [Category: ${i.category}]`).join('\n'))}
          className="px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-black uppercase tracking-wider hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20 shrink-0"
        >
          View Matrix
        </button>
      )}

      <button onClick={onClear} className="text-xs text-gray-400 hover:text-white underline shrink-0">
        Clear
      </button>
    </div>
  );
}
