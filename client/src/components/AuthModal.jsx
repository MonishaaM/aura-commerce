import { useState } from 'react';
import axios from 'axios';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/soundFX';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await axios.post(`${endpoint}`, payload);
      sound.playGlitterChime();
      onAuthSuccess(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication handshake failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#38124A] via-[#240a31] to-[#14031c] border border-[#EC4186]/45 p-8 sm:p-10 shadow-[0_0_60px_rgba(236,65,134,0.35)] text-white">
        
        {/* Close Button */}
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
        >
          <X size={22} />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EC4186] via-[#EE544A] to-white p-[2px] mx-auto mb-4 shadow-[0_0_30px_rgba(236,65,134,0.6)]">
            <div className="w-full h-full bg-[#38124A] rounded-2xl flex items-center justify-center text-[#EC4186]">
              <ShieldCheck size={32} />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
            {isLogin ? 'Customer Sign In' : 'Create Identity'}
          </h2>
          <p className="text-xs font-mono text-gray-300 uppercase tracking-widest mt-1.5 flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-[#EC4186]" />
            <span>Encrypted Token Verification</span>
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-black/40 p-1.5 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => { sound.playClick(); setIsLogin(true); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition ${
              isLogin ? 'bg-[#EC4186] text-white shadow-lg shadow-[#EC4186]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { sound.playClick(); setIsLogin(false); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition ${
              !isLogin ? 'bg-[#EC4186] text-white shadow-lg shadow-[#EC4186]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-mono text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC4186]" />
                <input
                  type="text"
                  required
                  placeholder="Monisha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 focus:border-[#EC4186] focus:outline-none text-sm text-white placeholder-gray-500 font-sans transition"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC4186]" />
              <input
                type="email"
                required
                placeholder="user@auraprime.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 focus:border-[#EC4186] focus:outline-none text-sm text-white placeholder-gray-500 font-sans transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">Master Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC4186]" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/15 focus:border-[#EC4186] focus:outline-none text-sm text-white placeholder-gray-500 font-sans transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-[#EC4186] via-[#EE544A] to-[#EC4186] text-white font-black text-sm uppercase tracking-widest hover:opacity-95 transition shadow-[0_0_30px_rgba(236,65,134,0.5)] flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{loading ? 'Validating Token...' : isLogin ? 'Access System' : 'Generate Credentials'}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
