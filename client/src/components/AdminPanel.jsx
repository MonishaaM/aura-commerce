import { useState } from 'react';
import axios from 'axios';
import { PlusCircle, Sliders, RefreshCw } from 'lucide-react';

export default function AdminPanel({ token, onProductCreated }) {
  const [newProduct, setNewProduct] = useState({
    title: '', description: '', price: '', stock: '', category: 'Hardware', image_url: ''
  });
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('Dispatched');
  const [msg, setMsg] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('http://localhost:5000/api/products', {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
        specs: { Origin: 'Aura Labs', Clearance: 'Standard' }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg('Product deployed to catalog successfully!');
      setNewProduct({ title: '', description: '', price: '', stock: '', category: 'Hardware', image_url: '' });
      if (onProductCreated) onProductCreated();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to add product (Admin clearance required).');
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: orderStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg(`Order #${orderId} telemetry updated to "${orderStatus}"`);
      setOrderId('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to update order status.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-cyan-400 flex items-center gap-2">
          <Sliders size={26} /> Admin Command Deck
        </h1>
        <p className="text-xs text-gray-400">Live inventory provisioning and telemetry stage orchestration.</p>
      </div>

      {msg && <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">{msg}</div>}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <PlusCircle size={18} className="text-cyan-400" /> Deploy New Product
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
            />
            <input
              type="text"
              required
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                step="0.01"
                required
                placeholder="Price ($)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
              />
              <input
                type="number"
                required
                placeholder="Initial Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full bg-[#131b2e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
            >
              <option value="Hardware">Hardware</option>
              <option value="Audio">Audio</option>
              <option value="Wearables">Wearables</option>
              <option value="Workspace">Workspace</option>
            </select>
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image_url}
              onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider transition"
            >
              Deploy to Catalog
            </button>
          </form>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <RefreshCw size={18} className="text-cyan-400" /> Dispatch Radar Telemetry
          </h2>
          <form onSubmit={handleUpdateStatus} className="space-y-3">
            <input
              type="number"
              required
              placeholder="Order ID (e.g. 1)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
            />
            <label className="text-xs text-gray-400 font-semibold block">Set New Stage</label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full bg-[#131b2e] border border-white/10 rounded-xl px-3 py-2 text-xs text-cyan-300 outline-none"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Security Verified">Security Verified</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider transition mt-4"
            >
              Broadcast State Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
