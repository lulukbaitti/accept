import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Camera, LogOut, Image as ImageIcon, User as UserIcon } from 'lucide-react';
import { auth } from '../utils/store';
import { useAuth } from '../utils/useAuth';

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.logout();
    navigate('/auth');
  };

  const displayName = user?.user_metadata?.name ?? user?.email ?? '';

  return (
    <div className="min-h-screen bg-pink-50 font-['Inter'] flex flex-col">
      <header className="bg-white border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors">
            <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="font-['Cherry_Bomb_One'] text-xl sm:text-2xl pt-1">LensaLoka</span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <Link
                  to="/create"
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm transition-colors ${
                    location.pathname.includes('/create')
                      ? 'bg-pink-600 text-white'
                      : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  }`}
                >
                  Buat Strip
                </Link>
                <Link
                  to="/gallery"
                  className={`p-2 rounded-full transition-colors ${
                    location.pathname === '/gallery'
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  title="Galeri"
                >
                  <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
                <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-4 border-l border-gray-200">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:block text-gray-700 max-w-[80px] truncate">
                    {displayName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Keluar"
                  >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-1.5 px-4 py-2 bg-pink-600 text-white rounded-full font-medium text-sm hover:bg-pink-700 transition-colors shadow-sm"
              >
                <UserIcon className="w-4 h-4" />
                <span>Masuk</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-3 sm:p-5 lg:p-8">
        {children}
      </main>

      <footer className="bg-white border-t border-pink-100 py-5 text-center text-sm text-gray-500">
        <p className="font-['Cherry_Bomb_One'] text-pink-300 text-lg mb-1">LensaLoka</p>
        <p>© {new Date().getFullYear()} LensaLoka Aesthetic Photobooth.</p>
      </footer>
    </div>
  );
}
