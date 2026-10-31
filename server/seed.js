const db = require('./db');

const expandedCatalog = [
  // 1. Electronics & Smart Hardware
  ['Aura Pro Wireless ANC Headphones', 'Over-ear hybrid active noise-canceling headphones with 40h battery, spatial audio and ultra-low latency.', 129.99, 179.99, 28, 'BESTSELLER', 45, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'SoundAura', Rating: '4.8 ★', Battery: '40 Hours', Driver: '40mm Titanium' })],
  ['Ergonomic Mechanical Keyboard', 'Hot-swappable RGB mechanical board with pre-lubed tactile switches and custom PBT keycaps.', 89.50, 119.50, 25, 'HOT DEAL', 30, 'Electronics', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'KeyCraft', Rating: '4.9 ★', Switches: 'Tactile Gateron', Connectivity: 'Tri-Mode Wireless' })],
  ['Ultra-Clear 4K Web Camera', '4K autofocus webcam with dual beamforming stereo mics, auto-exposure and magnetic privacy shutter.', 64.99, 89.99, 28, 'FLASH SALE', 50, 'Electronics', 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'VisionStream', Rating: '4.6 ★', Resolution: '4K @ 30fps', FOV: '90 Degrees' })],

  // 2. Fashion & Luxury Apparel
  ['Classic Minimalist Leather Chrono', 'Water-resistant surgical stainless steel case with genuine full-grain Italian leather band.', 119.00, 169.00, 30, 'LIMITED', 25, 'Fashion', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'Krono', Rating: '4.7 ★', Glass: 'Sapphire Crystal', WaterResist: '5 ATM' })],
  ['Waterproof Urban Commuter Backpack', 'Reinforced Cordura 24L laptop daypack with TSA lock, hidden passport pocket and USB port.', 54.99, 79.99, 31, 'POPULAR', 60, 'Fashion', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'NordicPack', Rating: '4.9 ★', LaptopFit: 'Up to 16-inch', Fabric: 'Cordura 1000D' })],
  ['Polarized Aviator Sunglasses', 'Precision polarized UV400 lenses housed in an ultralight aerospace titanium alloy frame.', 39.99, 59.99, 33, 'SALE', 80, 'Fashion', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'Solara', Rating: '4.5 ★', Protection: '100% UV400', Weight: '18 Grams' })],

  // 3. Home & Ergonomic Workspace
  ['Aura Ambient Smart LED Light Column', 'Dynamic RGBIC rhythm light bar synced to sound tempo with 16 million colors and app controls.', 49.99, 69.99, 29, 'TRENDING', 70, 'Home', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'Lumina', Rating: '4.7 ★', Control: 'Voice + App', Height: '42cm' })],
  ['Ergonomic Memory Foam Lumbar Support', 'High-density orthopedic contour cushion with breathable 3D air mesh cover for desk chairs.', 34.50, 48.00, 28, 'ESSENTIAL', 40, 'Home', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'PostureAlign', Rating: '4.8 ★', Core: 'Memory Foam', Warranty: '3 Years' })],
  ['Ceramic Pour-Over Coffee Dripper Kit', 'Hand-glazed matte ceramic dripper with borosilicate server carafe and 50 unbleached filters.', 29.99, 42.00, 29, 'NEW', 35, 'Home', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'BaristaCraft', Rating: '4.9 ★', Capacity: '600ml', Material: 'Ceramic & Glass' })],

  // 4. Fitness & Wellness
  ['Stainless Steel Insulated Thermo Flask', 'Double-wall vacuum-sealed stainless steel bottle keeping beverages ice-cold for 24h or hot for 12h.', 24.99, 34.99, 29, 'OFFER', 100, 'Fitness', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'HydroCore', Rating: '4.9 ★', Capacity: '1000ml', Steel: '18/8 Food Grade' })],
  ['Smart Fitness & Biometrics Band', 'Real-time heart rate sensor, SpO2 blood oxygen monitor, sleep cadence tracker, 14-day battery.', 59.99, 85.00, 29, 'TOP RATED', 35, 'Fitness', 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'PulseFit', Rating: '4.6 ★', BatteryLife: '14 Days', Waterproof: 'IP68' })],
  ['High-Density Non-Slip Yoga Mat', 'Eco-friendly TPE alignment line fitness mat with shock-absorbing double-layer cushioning.', 32.00, 45.00, 29, 'POPULAR', 50, 'Fitness', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'ZenMotion', Rating: '4.8 ★', Thickness: '6mm', Material: 'Eco-TPE' })],

  // 5. Gaming & Cyber Equipment
  ['AeroBlade Wireless Gaming Mouse', 'Ultralight 58g honeycomb shell mouse with 26,000 DPI optical sensor and 1000Hz polling rate.', 69.99, 99.99, 30, 'GAMER CHOICE', 28, 'Gaming', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'ViperX', Rating: '4.9 ★', DPI: '26,000', Weight: '58 Grams' })],
  ['Pro Micro-Weave Extended Mousepad', 'Stitched edge water-repellent micro-weave surface optimized for high-speed tracking accuracy.', 22.50, 32.00, 30, 'BEST VALUE', 90, 'Gaming', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'GridControl', Rating: '4.8 ★', Dimensions: '900x400mm', Base: 'Natural Rubber' })],

  // 6. Beauty & Personal Care
  ['Sonic Facial Cleansing & Exfoliator Tool', 'Medical-grade antibacterial silicone brush delivering 8,000 acoustic pulses per minute.', 36.99, 52.00, 29, 'HOT', 40, 'Beauty', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'DermaGlow', Rating: '4.7 ★', Speeds: '5 Modes', Charge: 'Wireless Dock' })],
  ['Organic Botanical Revitalizing Serum', 'Cold-pressed botanical elixir rich in squalane, hyaluronic acid and vitamin C for intense hydration.', 28.50, 40.00, 29, 'ORGANIC', 65, 'Beauty', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80', JSON.stringify({ Brand: 'AuraNaturals', Rating: '4.9 ★', Volume: '50ml', Certification: '100% Vegan' })]
];

db.serialize(() => {
  db.run('DELETE FROM products');
  const stmt = db.prepare(`
    INSERT INTO products (title, description, price, original_price, discount_percent, badge, stock, category, image_url, specs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  expandedCatalog.forEach(p => stmt.run(p));
  stmt.finalize(() => {
    console.log('Database successfully seeded with comprehensive multi-domain products!');
    process.exit(0);
  });
});
