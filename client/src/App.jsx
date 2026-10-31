import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ShoppingCart, PackageCheck, Sparkles, X, Trash2, User, Sliders, LogOut, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import AmbientBackground from './components/AmbientBackground';
import GlitterPointer from './components/GlitterPointer';
import HeroSection from './components/HeroSection';
import MysteryFlashDeals from './components/MysteryFlashDeals';
import FilterToolbar from './components/FilterToolbar';
import ProductCard from './components/ProductCard';
import OrderRadar from './components/OrderRadar';
import ComparisonDock from './components/ComparisonDock';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import AuraBot from './components/AuraBot';
import FAQSection from './components/FAQSection';
import { sound } from './utils/soundFX';

const photoCatalog = [
  // 1. Electronics
  { id: 1, title: 'Aura Pro Wireless ANC Headphones', description: 'Over-ear hybrid active noise-canceling headphones with 40h battery, spatial soundstage, and memory foam earcups.', price: 129.99, original_price: 179.99, discount_percent: 28, badge: 'BESTSELLER', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', specs: { Battery: '40 Hours', Driver: '40mm Titanium', Connectivity: 'Bluetooth 5.3' } },
  { id: 2, title: 'Ergonomic Mechanical Keyboard', description: 'Custom hot-swappable tactile RGB mechanical board with sound-dampening gasket mount and PBT keycaps.', price: 89.50, original_price: 119.50, discount_percent: 25, badge: 'HOT DEAL', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80', specs: { Switches: 'Tactile Gateron', Layout: '75% Compact', Weight: '920g' } },
  { id: 3, title: 'Ultra-Clear 4K Web Camera', description: 'Dual noise-canceling stereo microphones, automatic low-light correction, and a magnetic privacy shutter.', price: 64.99, original_price: 89.99, discount_percent: 28, badge: 'FLASH SALE', category: 'Electronics', image_url: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80', specs: { Resolution: '4K @ 30fps', FOV: '90 deg', Mount: 'Universal Clip' } },

  // 2. Footwear
  { id: 4, title: 'CloudStride Breathable Running Sneakers', description: 'High-rebound responsive foam running shoes with engineered lightweight mesh for all-day comfort.', price: 79.99, original_price: 115.00, discount_percent: 30, badge: 'TRENDING', category: 'Footwear', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', specs: { Sole: 'EVA High-Rebound', Upper: 'Engineered Knit', Weight: '240g' } },
  { id: 5, title: 'Classic Leather Minimalist Loafers', description: 'Handcrafted genuine grain leather slip-on loafers featuring an orthopedic insole and anti-slip rubber outsole.', price: 95.00, original_price: 135.00, discount_percent: 30, badge: 'PREMIUM', category: 'Footwear', image_url: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80', specs: { Material: 'Calfskin Leather', Insole: 'Arch Support', Sole: 'Anti-Slip' } },

  // 3. Fashion & Apparel
  { id: 6, title: 'Classic Minimalist Leather Chrono', description: 'Surgical-grade stainless steel casing with an interchangeable genuine Italian leather quick-release strap.', price: 119.00, original_price: 169.00, discount_percent: 30, badge: 'LIMITED', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', specs: { Dial: 'Sapphire Crystal', WaterResist: '50m', Case: '40mm' } },
  { id: 7, title: 'Waterproof Urban Commuter Backpack', description: 'Reinforced 24L daypack with a dedicated padded 16-inch laptop compartment and anti-theft zipper locks.', price: 54.99, original_price: 79.99, discount_percent: 31, badge: 'POPULAR', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80', specs: { Capacity: '24 Liters', Fabric: 'Cordura 1000D', LaptopFit: '16 Inch' } },
  { id: 8, title: 'Polarized Aviator Sunglasses', description: 'Ultralight aerospace titanium alloy frame paired with 100% UV400 protective polarized lenses.', price: 39.99, original_price: 59.99, discount_percent: 33, badge: 'SALE', category: 'Fashion', image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80', specs: { Lens: 'Polarized TAC', Frame: 'Titanium', UVRating: 'UV400' } },

  // 4. Home & Workspace
  { id: 9, title: 'Aura Ambient Smart LED Light Column', description: 'Dynamic RGBIC room bar lamp synced to ambient music rhythm and app-controlled lighting scenes.', price: 49.99, original_price: 69.99, discount_percent: 29, badge: 'TOP RATED', category: 'Home', image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80', specs: { Colors: '16M RGBIC', Height: '42cm', Power: 'USB-C 5V' } },
  { id: 10, title: 'Ergonomic Memory Foam Lumbar Support', description: 'Contoured orthopedic posture cushion for desk chairs with a breathable and washable 3D mesh cover.', price: 34.50, original_price: 48.00, discount_percent: 28, badge: 'OFFER', category: 'Home', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', specs: { Core: 'Slow-Rebound Foam', Cover: '3D Air Mesh', Strap: 'Dual Adjustable' } },

  // 5. Kitchen & Living
  { id: 11, title: 'Precision Gooseneck Pour-Over Kettle', description: 'Variable temperature matte black stainless steel gooseneck kettle with a digital base thermostat.', price: 68.00, original_price: 95.00, discount_percent: 28, badge: 'BARISTA', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', specs: { Capacity: '900ml', Material: '304 Steel', Power: '1200W Rapid' } },
  { id: 12, title: 'Borosilicate Glass Server & Dripper Set', description: 'Heat-resistant dual-layer glass coffee dripper carafe accented with a natural bamboo collar ring.', price: 32.50, original_price: 46.00, discount_percent: 29, badge: 'HOT', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', specs: { Capacity: '600ml', Glass: 'Borosilicate', Base: 'Natural Bamboo' } },

  // 6. Fitness & Lifestyle
  { id: 13, title: 'Stainless Steel Insulated Thermo Flask', description: 'Double-wall vacuum bottle keeping drinks ice-cold for 24 hours or steaming hot for 12 hours.', price: 24.99, original_price: 34.99, discount_percent: 29, badge: 'ESSENTIAL', category: 'Fitness', image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80', specs: { Capacity: '1000ml', Steel: '18/8 Food Grade', Insulation: 'Copper Core' } },
  { id: 14, title: 'Smart Fitness & Biometrics Band', description: 'SpO2 oxygen monitoring, continuous heart rate telemetry, sleep stages, and a 14-day battery life.', price: 59.99, original_price: 85.00, discount_percent: 29, badge: 'TOP RATED', category: 'Fitness', image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80', specs: { Battery: '14 Days', WaterResist: '5 ATM', Display: 'AMOLED 1.47"' } },

  // 7. Gaming
  { id: 15, title: 'AeroBlade 58g Ultralight Gaming Mouse', description: 'Ultralight honeycomb shell equipped with a 26,000 DPI optical sensor and 100% virgin PTFE skates.', price: 69.99, original_price: 99.99, discount_percent: 30, badge: 'GAMER', category: 'Gaming', image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80', specs: { Sensor: '26K DPI Optical', Weight: '58 Grams', Battery: '80 Hours' } },
  { id: 16, title: 'Extended Micro-Weave Desk Mat', description: 'Anti-fray stitched border desk pad engineered for smooth glide tracking and keyboard dampening.', price: 22.50, original_price: 32.00, discount_percent: 30, badge: 'BEST VALUE', category: 'Gaming', image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80', specs: { Size: '900 x 400 mm', Thickness: '4mm', Base: 'Natural Rubber' } }
];

export default function App() {
  const [products, setProducts] = useState(photoCatalog);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [comparisonItems, setComparisonItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('catalog');
  const [screenShake, setScreenShake] = useState(false);

  // Filter & Search
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(300);

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('aura_token');
    const user = localStorage.getItem('aura_user');
    return token && user ? { token, user: JSON.parse(user) } : null;
  });

  const [trackingId, setTrackingId] = useState('');
  const [trackingStatus, setTrackingStatus] = useState('Dispatched');

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map((p) => p.category))];
  }, [products]);

  const maxPrice = useMemo(() => {
    return products.length > 0 ? Math.ceil(Math.max(...products.map(p => p.price))) : 300;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                            p.description.toLowerCase().includes(search.toLowerCase());
        const matchPrice = p.price <= priceRange;
        return matchCategory && matchSearch && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [products, search, selectedCategory, priceRange, sortBy]);

  const handleAuthSuccess = (data) => {
    sound.playGlitterChime();
    setAuth(data);
    localStorage.setItem('aura_token', data.token);
    localStorage.setItem('aura_user', JSON.stringify(data.user));
  };

  const handleLogout = () => {
    sound.playClick();
    setAuth(null);
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
    if (activeTab === 'admin') setActiveTab('catalog');
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    sound.playClick();
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCompare = (product) => {
    if (comparisonItems.some((i) => i.id === product.id)) return;
    if (comparisonItems.length >= 3) {
      alert('You can compare a maximum of 3 products simultaneously.');
      return;
    }
    setComparisonItems([...comparisonItems, product]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!auth) {
      setIsAuthOpen(true);
      return;
    }

    try {
      sound.playGlitterChime();
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 350);

      const payload = {
        items: cart.map(item => ({ product_id: item.id, quantity: item.quantity, unit_price: item.price })),
        total_amount: cartTotal,
        shipping_address: '221B Baker Street, Chennai, TN'
      };

      const res = await axios.post('/api/orders', payload, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      confetti({ particleCount: 130, spread: 80, origin: { y: 0.8 } });
      alert(`Order #${res.data.orderId} placed successfully!`);
      setTrackingId(res.data.orderId);
      setCart([]);
      setIsCartOpen(false);
      setActiveTab('tracking');
    } catch (err) {
      alert(err.response?.data?.error || 'Order execution failed. Please verify stock.');
    }
  };

  const pollOrderStatus = async () => {
    if (!trackingId) return;
    sound.playClick();
    try {
      const res = await axios.get(`/api/orders/${trackingId}`);
      setTrackingStatus(res.data.status);
    } catch {
      alert('Order ID not located in database.');
    }
  };

  return (
    <div className={`min-h-screen relative font-sans text-white selection:bg-[#EC4186] selection:text-white ${screenShake ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : ''}`}>
      <AmbientBackground />
      <GlitterPointer />
      <AuraBot onSelectCategory={(cat) => setSelectedCategory(cat)} />
      <ComparisonDock
        items={comparisonItems}
        onRemove={(id) => setComparisonItems(comparisonItems.filter(i => i.id !== id))}
        onClear={() => setComparisonItems([])}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={handleAuthSuccess} />

      {/* Promotional Top Ribbon */}
      <div className="bg-gradient-to-r from-[#EC4186] via-[#EE544A] to-[#EC4186] text-white font-black text-[11px] py-2 px-4 text-center uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(236,65,134,0.6)]">
        <Sparkles size={14} className="animate-spin" />
        <span>AURA PRIME GALA: INSTANT 25% – 33% DISCOUNTS & COMPLIMENTARY EXPRESS SHIPPING</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#38124A]/85 border-b border-[#EC4186]/35 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => { sound.playClick(); setActiveTab('catalog'); setSelectedCategory('All'); }}>
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EC4186] via-[#EE544A] to-[#FFFFFF] p-[2px] shadow-[0_0_25px_rgba(236,65,134,0.7)]">
            <div className="w-full h-full bg-[#38124A] rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#EC4186] fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 19.7778H22L12 2ZM12 6.88889L17.7778 17.1111H6.22222L12 6.88889ZM12 11.5556L9.55556 15.7778H14.4444L12 11.5556Z" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-black tracking-widest text-xl bg-gradient-to-r from-[#FFFFFF] via-[#EC4186] to-[#EE544A] bg-clip-text text-transparent">
              AURA PRIME
            </span>
            <span className="block text-[9px] font-mono tracking-widest text-[#EE544A] uppercase font-bold">Premium Multi-Domain Retail</span>
          </div>
        </div>

        <div className="hidden md:flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => { sound.playClick(); setActiveTab('catalog'); }}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'catalog' ? 'bg-[#EC4186] text-white shadow-lg shadow-[#EC4186]/40' : 'text-gray-200 hover:text-white'
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('tracking'); }}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
              activeTab === 'tracking' ? 'bg-[#EC4186] text-white shadow-lg shadow-[#EC4186]/40' : 'text-gray-200 hover:text-white'
            }`}
          >
            <PackageCheck size={16} /> Live Radar
          </button>
          {auth?.user?.role === 'admin' && (
            <button
              onClick={() => { sound.playClick(); setActiveTab('admin'); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'bg-[#EE544A] text-white shadow-lg shadow-[#EE544A]/40' : 'text-gray-200 hover:text-white'
              }`}
            >
              <Sliders size={16} /> Admin Command
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {auth ? (
            <div className="flex items-center gap-2.5 bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-2xl text-xs">
              <span className="font-bold text-white">{auth.user.name}</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#EC4186]/30 text-white border border-[#EC4186]/40">{auth.user.role}</span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-rose-400 ml-1">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { sound.playClick(); setIsAuthOpen(true); }}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#EC4186] to-[#EE544A] hover:opacity-95 text-white text-xs sm:text-sm font-black uppercase tracking-wider transition shadow-[0_0_20px_rgba(236,65,134,0.5)] hover:scale-105 active:scale-95"
            >
              <User size={16} className="text-white" />
              <span>Authenticate</span>
            </button>
          )}

          <button
            onClick={() => { sound.playClick(); setIsCartOpen(true); }}
            className="relative p-2.5 rounded-2xl bg-gradient-to-r from-[#EC4186] to-[#EE544A] hover:opacity-90 text-white font-black transition flex items-center gap-2 shadow-[0_0_25px_rgba(236,65,134,0.5)] hover:scale-105 active:scale-95"
          >
            <ShoppingCart size={18} className="text-white" />
            <span className="text-xs bg-[#38124A] text-white px-2 py-0.5 rounded-full font-mono font-bold">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
          </button>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="py-8">
        {activeTab === 'catalog' && (
          <>
            <HeroSection onExploreCategory={(cat) => setSelectedCategory(cat)} />
            <MysteryFlashDeals onApplyMysteryDiscount={() => {}} />

            <div className="max-w-7xl mx-auto px-6">
              <FilterToolbar
                search={search}
                setSearch={setSearch}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxAvailablePrice={maxPrice}
              />

              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-[#280c35]/60 border border-[#EC4186]/30 rounded-3xl backdrop-blur-md my-8">
                  <p className="text-gray-300 font-mono text-sm uppercase tracking-wider">No matching products found in this category.</p>
                  <button
                    onClick={() => { setSearch(''); setSelectedCategory('All'); setPriceRange(300); }}
                    className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white font-mono text-xs font-bold uppercase"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onAddToCompare={addToCompare}
                    />
                  ))}
                </div>
              )}
            </div>

            <FAQSection />
          </>
        )}

        {activeTab === 'tracking' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-black text-center mb-2 bg-gradient-to-r from-[#FFFFFF] via-[#EC4186] to-[#EE544A] bg-clip-text text-transparent">
              Live Order Dispatch Radar
            </h1>
            <p className="text-center text-gray-300 text-xs font-mono uppercase tracking-widest mb-8">
              Decentralized order verification and delivery telemetry
            </p>

            <div className="flex justify-center gap-3 mb-10 max-w-md mx-auto">
              <input
                type="number"
                placeholder="Enter Order ID (e.g. 1)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-xs text-white outline-none focus:border-[#EC4186] w-full font-mono"
              />
              <button
                onClick={pollOrderStatus}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#EC4186] to-[#EE544A] hover:opacity-90 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#EC4186]/40"
              >
                Scan
              </button>
            </div>

            <OrderRadar currentStatus={trackingStatus} />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-6">
            <AdminPanel token={auth?.token} onProductCreated={() => {}} />
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#22082E] border-l border-[#EC4186]/40 h-full p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <h2 className="text-xl font-black flex items-center gap-2 text-white">
                  <Sparkles size={20} className="text-[#EC4186]" /> Your Shopping Cart
                </h2>
                <button onClick={() => { sound.playClick(); setIsCartOpen(false); }} className="p-2 text-gray-400 hover:text-white">
                  <X size={22} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400 font-mono text-xs py-16 text-center uppercase tracking-widest">
                  Your cart is currently empty.
                </p>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#EC4186]/40 transition">
                      <div>
                        <h4 className="font-bold text-sm text-white">{item.title}</h4>
                        <p className="text-xs font-mono text-[#EE544A]">${Number(item.price).toFixed(2)} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-black text-white text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-5">
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-gray-300 uppercase">Subtotal</span>
                  <span className="text-2xl font-black text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#EC4186] via-[#EE544A] to-[#EC4186] hover:opacity-90 text-white font-black uppercase tracking-widest text-xs transition shadow-[0_0_30px_rgba(236,65,134,0.5)]"
                >
                  {auth ? 'Complete Purchase' : 'Login to Checkout'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

