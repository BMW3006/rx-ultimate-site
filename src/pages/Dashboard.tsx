import { useState, useEffect } from 'react';
import { Trophy, Cpu, Download, Wrench, PlayCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { callAPI } from '../lib/api';

const features = [
  {
    title: 'Football Central',
    desc: 'Live scores, transfer news, and league standings.',
    icon: Trophy,
    path: '/football',
    color: 'text-primary'
  },
  {
    title: 'AI Playground',
    desc: 'Powered by GPT-4o & Gemini. Ask questions and get answers instantly.',
    icon: Cpu,
    path: '/ai',
    color: 'text-purple-400'
  },
  {
    title: 'Media Downloader',
    desc: 'Download from YouTube, TikTok, and Instagram in high quality.',
    icon: Download,
    path: '/download',
    color: 'text-green-400'
  },
  {
    title: 'Smart Tools',
    desc: 'Stylish text and other digital tools in one place.',
    icon: Wrench,
    path: '/tools',
    color: 'text-yellow-400'
  }
];

export function Dashboard() {
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeaser = async () => {
      try {
        const res = await callAPI('/football/livescore');
        const matches = res.result?.matches || res.result || [];
        setLiveMatches(Array.isArray(matches) ? matches.slice(0, 3) : []);
      } catch (err) {
        console.error('Failed to fetch dashboard teaser');
      } finally {
        setLoading(false);
      }
    };
    fetchTeaser();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f4616696-978e-4f6c-9706-c261046ddd57/hero-sports-553d4e37-1779946497050.webp" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-xs font-black tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              RX Ultimate v2.0 Live
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
              THE <span className="text-primary cyan-text-glow">ULTIMATE</span> SPORTS & AI HUB
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              Experience a unique blend of sports news and cutting-edge AI tools. 
              Real-time scores, global news, and premium digital services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/football" className="bg-primary text-black px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                GET STARTED <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
              <Link to="/ai" className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors">
                EXPLORE AI
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">LIVE MATCHES</h2>
              <p className="text-gray-500 font-medium">What's happening on the pitch right now around the world.</p>
            </div>
            <Link to="/football" className="text-primary font-black flex items-center gap-2 group">
              VIEW ALL GAMES <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex flex-col items-center py-10">
                <Loader2 className="animate-spin text-primary mb-4" />
                <p className="text-gray-600">Searching matches...</p>
              </div>
            ) : liveMatches.length > 0 ? (
              liveMatches.map((match, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-primary uppercase">{match.league || 'LIVE'}</span>
                    <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded animate-pulse">LIVE</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-300">{match.homeTeam || match.home_name}</span>
                      <span className="text-2xl font-black text-white">{match.homeScore ?? match.score?.split('-')[0] ?? 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-300">{match.awayTeam || match.away_name}</span>
                      <span className="text-2xl font-black text-white">{match.awayScore ?? match.score?.split('-')[1] ?? 0}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-gray-600">No live matches at the moment.</div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">OUR SERVICES</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Everything you need for sports, AI, and digital tools in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={f.path} 
                className="group block bg-[#111111] border border-white/5 p-8 rounded-3xl card-hover h-full relative overflow-hidden"
              >
                <div className={`mb-6 p-4 bg-white/5 w-fit rounded-2xl ${f.color} group-hover:bg-primary group-hover:text-black transition-colors`}>
                  <f.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-gray-500 mb-8 line-clamp-2">{f.desc}</p>
                <div className="flex items-center text-primary font-black text-sm group-hover:gap-3 transition-all">
                  DISCOVER MORE <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pro Sports Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-cyan-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">WATCH SPORTS LIVE ON THE GO</h2>
              <p className="text-black/70 text-lg mb-8 font-bold">
                Get access to live streaming links for various sports directly on your phone or computer.
              </p>
              <Link to="/sports" className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black hover:scale-110 transition-transform">
                <PlayCircle /> START WATCHING
              </Link>
            </div>
            <div className="hidden md:block">
               <div className="w-80 h-80 bg-black/10 rounded-full flex items-center justify-center border-8 border-black/5 animate-pulse">
                  <PlayCircle className="h-32 w-32 text-black" />
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        </div>
      </section>
    </div>
  );
}