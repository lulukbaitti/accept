import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { auth } from '../utils/store';

export function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isLogin) {
        await auth.login(email, password);
        navigate('/create');
      } else {
        if (!name.trim()) throw new Error('Nama tidak boleh kosong.');
        if (password.length < 6) throw new Error('Password minimal 6 karakter.');
        await auth.register(name, email, password);
        setSuccess('Yeay! Berhasil daftar. Cek email kamu untuk konfirmasi, lalu login.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setError('');
    setSuccess('');
  };

  return (
    <div className="max-w-md mx-auto mt-6 sm:mt-10 px-2">
      <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 overflow-hidden border border-pink-100">
        {/* Header */}
        <div className="bg-pink-600 p-6 sm:p-8 text-center text-white relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)',
              backgroundSize: '20px 20px',
            }}
          />
          <Camera className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 relative z-10" />
          <h1 className="text-2xl sm:text-3xl font-['Cherry_Bomb_One'] relative z-10">LensaLoka</h1>
          <p className="text-pink-100 mt-1 relative z-10 font-medium text-sm">Capture your cute moments!</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 py-3.5 font-bold text-sm transition-colors ${
              !isLogin ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => switchTab(false)}
          >
            DAFTAR BARU
          </button>
          <button
            className={`flex-1 py-3.5 font-bold text-sm transition-colors ${
              isLogin ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => switchTab(true)}
          >
            LOGIN
          </button>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl flex items-start gap-2 text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-xl flex items-start gap-2 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Panggilan</label>
                <input
                  type="text"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Misal: Caca"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder={isLogin ? 'Password kamu' : 'Minimal 6 karakter'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-pink-600 text-white rounded-xl font-bold text-base sm:text-lg hover:bg-pink-700 active:scale-[0.98] transition-all mt-2 shadow-md shadow-pink-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : isLogin ? (
                'Masuk'
              ) : (
                'Daftar Sekarang'
              )}
            </button>
          </form>

          {isLogin && (
            <p className="text-center text-sm text-gray-500 mt-5">
              Belum punya akun?{' '}
              <button onClick={() => switchTab(false)} className="text-pink-600 font-bold hover:underline">
                Daftar dulu ya!
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
