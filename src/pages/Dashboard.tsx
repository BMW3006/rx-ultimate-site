import { Trophy, Cpu, Download, Wrench, PlayCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Football Central',
    desc: 'Live scores, transfer news, and league standings across Europe.',
    icon: Trophy,
    path: '/football',
    color: 'text-primary'
  },
  {
    title: 'AI Playground',
    desc: 'Powered by GPT-4o & Gemini. Generate images and music instantly.',
    icon: Cpu,
    path: '/ai',
    color: 'text-purple-400'
  },
  {
    title: 'Media Downloader',
    desc: 'Download from YouTube, TikTok, Spotify and more in high quality.',
    icon: Download,
    path: '/download',
    color: 'text-green-400'
  },
  {
    title: 'Smart Tools',
    desc: 'QR generators, fancy text, and URL shorteners in one place.',
    icon: Wrench,
    path: '/tools',
    color: 'text-yellow-400'
  },
  {
    title: 'Pro Sports',
    desc: 'Basketball live scores and premium sports streaming matches.',
    icon: PlayCircle,
    path: '/sports',
    color: 'text-red-400'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f4616696-978e-4f6c-9706-c261046ddd57/hero-sports-553d4e37-1779946497050.webp" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              THE <span className="text-primary cyan-text-glow">ULTIMATE</span> SPORTS & AI HUB
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the next generation of sports reporting and AI-powered productivity. 
              Real-time scores, global news, and advanced digital tools.
            </p>
            <div className="flex space-x-4">
              <Link to="/football" className="bg-primary text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/ai" className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors">
                Explore AI
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <span className="w-2 h-8 bg-primary mr-4"></span>
          CATEGORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={f.path} 
                className="group block bg-[#111111] border border-white/5 p-8 rounded-2xl card-hover relative overflow-hidden"
              >
                <div className={`mb-4 ${f.color}`}>
                  <f.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-gray-400 mb-6">{f.desc}</p>
                <div className="flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </div>
                
                {/* Decoration */}
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <f.icon className="h-32 w-32" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured News Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111111] rounded-3xl overflow-hidden group border border-white/5">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f4616696-978e-4f6c-9706-c261046ddd57/football-news-1-ced4ea63-1779946497473.webp" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-8">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Top Story</span>
              <h3 className="text-3xl font-bold mb-4">Champions League: Round of 16 Drama Unfolds</h3>
              <p className="text-gray-400 mb-6">
                Expect the unexpected as the European giants clash in the most prestigious tournament. 
                Full coverage, statistics, and live updates.
              </p>
              <Link to="/football" className="text-white font-bold flex items-center hover:text-primary">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="bg-[#111111] rounded-3xl overflow-hidden group border border-white/5">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f4616696-978e-4f6c-9706-c261046ddd57/ai-hero-31f41d11-1779946497721.webp" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-8">
              <span className="text-purple-400 font-bold text-sm tracking-widest uppercase mb-2 block">AI Innovation</span>
              <h3 className="text-3xl font-bold mb-4">GPT-4o: The Future of Interaction</h3>
              <p className="text-gray-400 mb-6">
                Explore the capabilities of the latest multimodal model. 
                From reasoning to creativity, our AI Hub brings it all to your fingertips.
              </p>
              <Link to="/ai" className="text-white font-bold flex items-center hover:text-purple-400">
                Try GPT-4o <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}