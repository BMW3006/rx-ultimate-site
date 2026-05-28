import { NavLink } from 'react-router-dom';
import { Menu, X, Trophy, Cpu, Download, Wrench, PlayCircle, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Football', path: '/football', icon: Trophy },
  { name: 'AI Hub', path: '/ai', icon: Cpu },
  { name: 'Downloader', path: '/download', icon: Download },
  { name: 'Tools', path: '/tools', icon: Wrench },
  { name: 'Sports', path: '/sports', icon: PlayCircle },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-black tracking-tighter text-primary cyan-text-glow">
              RX ULTIMATE
            </NavLink>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-primary border-b-2 border-primary rounded-none' 
                        : 'text-gray-300 hover:text-primary'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111111]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-primary text-black' : 'text-gray-300 hover:bg-gray-700'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}