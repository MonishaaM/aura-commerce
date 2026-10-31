import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { sound } from '../utils/soundFX';

export default function FilterToolbar({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  maxAvailablePrice
}) {
  return (
    <div className="bg-[#280c35]/80 border border-[#EC4186]/30 backdrop-blur-2xl rounded-3xl p-6 mb-8 space-y-4 shadow-xl">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC4186]" />
          <input
            type="text"
            placeholder="Search electronics, apparel, lifestyle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#110318]/70 border border-white/15 focus:outline-none focus:border-[#EC4186] text-sm text-white placeholder-gray-400 font-mono"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
            <ArrowUpDown size={14} className="text-[#EE544A]" />
            <span>SORT:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => { sound.playClick(); setSortBy(e.target.value); }}
            className="bg-[#1e0728] border border-[#EC4186]/40 rounded-xl px-3 py-2 text-xs text-[#FFFFFF] outline-none font-mono"
          >
            <option value="featured">Featured / Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Alphabetical: A - Z</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between pt-4 border-t border-white/10">
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs text-gray-300 mr-2 flex items-center gap-1.5 font-mono">
            <SlidersHorizontal size={14} className="text-[#EC4186]" /> DOMAIN:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { sound.playClick(); setSelectedCategory(cat); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white font-extrabold shadow-lg shadow-[#EC4186]/40'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <span className="text-xs text-gray-300 font-mono whitespace-nowrap">MAX PRICE:</span>
          <input
            type="range"
            min="10"
            max={maxAvailablePrice || 250}
            step="5"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full lg:w-36 accent-[#EC4186] cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-[#FFFFFF] w-14 text-right">
            ${priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}
