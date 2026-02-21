import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Settings, LogOut } from 'lucide-react';
import { PortfolioData } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  data: PortfolioData;
  isAdmin: boolean;
  onAdminClick: () => void;
  onExitAdmin: () => void;
}

export default function Layout({ children, data, isAdmin, onAdminClick, onExitAdmin }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Community', href: '/community' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-12 transition-transform">
                S
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900">Sakib Sabbir</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-bold uppercase tracking-widest transition-colors group ${
                    location.pathname === item.href ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${
                    location.pathname === item.href ? 'w-full' : ''
                  }`}></span>
                </Link>
              ))}
              <Link
                to="/hire"
                className="px-6 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Hire Me
              </Link>
              <button 
                onClick={isAdmin ? onExitAdmin : onAdminClick}
                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {isAdmin ? <LogOut size={20} /> : <Settings size={20} />}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-100 px-4 py-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-bold uppercase tracking-widest ${
                  location.pathname === item.href ? 'text-blue-600' : 'text-slate-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                isAdmin ? onExitAdmin() : onAdminClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-slate-900"
            >
              {isAdmin ? <><LogOut size={20} /> Exit Admin</> : <><Settings size={20} /> Admin</>}
            </button>
          </motion.div>
        )}
      </nav>

      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
                S
              </div>
              <span className="font-black text-xl tracking-tighter">Sakib Sabbir</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8">
              {data.settings.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-slate-400 mb-6">Navigation</h4>
            <div className="flex flex-col gap-4">
              {navItems.map(item => (
                <Link key={item.name} to={item.href} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-slate-400 mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${data.settings.email}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                {data.settings.email}
              </a>
              <a href={`https://wa.me/${data.settings.whatsapp}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">© 2026 Sakib Sabbir. All rights reserved.</p>
          <div className="flex gap-6">
            {data.social.map(link => (
              <a key={link.platform} href={link.url} className="text-slate-400 hover:text-blue-600 transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">{link.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
