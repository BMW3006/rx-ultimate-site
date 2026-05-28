import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import { PlayCircle, Radio, Users, Activity, Loader2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function Sports() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [streams, setStreams] = useState<any[]>([]);

  const fetchSports = async () => {
    setLoading(true);
    try {
      const [basketRes, streamRes] = await Promise.all([
        apiFetch('/basketball/livescore'),
        apiFetch('/sports/live')
      ]);
      setData(basketRes.result || basketRes);
      setStreams(streamRes.result || []);
    } catch (err) {
      toast.error('Failed to load sports data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
    const interval = setInterval(fetchSports, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-black flex items-center gap-4">
          <Activity className="text-primary h-12 w-12" />
          MULTI-SPORTS
        </h1>
        <button 
          onClick={fetchSports}
          className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-sm font-bold hover:bg-white/10"
        >
          Refresh Feed
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basketball Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tighter">
            <div className="w-1.5 h-6 bg-primary" />
            Basketball Live
          </h2>
          
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center bg-[#111111] rounded-3xl border border-white/5">
              <Loader2 className="animate-spin text-primary h-8 w-8 mb-2" />
              <p className="text-gray-500">Loading hoops...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((game: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#111111] p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-primary/40 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                        <span className="text-primary">NBA</span> • {game.status || 'LIVE'}
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="space-y-2">
                            <div className="text-xl font-bold">{game.home_team || 'Team A'}</div>
                            <div className="text-xl font-bold">{game.away_team || 'Team B'}</div>
                         </div>
                         <div className="text-right space-y-2">
                            <div className="text-2xl font-black text-white">{game.home_score || 0}</div>
                            <div className="text-2xl font-black text-white">{game.away_score || 0}</div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-[#111111] p-12 rounded-3xl text-center text-gray-500 italic border border-white/5">
                  No basketball games currently live.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Streaming Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tighter text-red-500">
            <Radio className="animate-pulse" />
            Live Streams
          </h2>
          
          <div className="space-y-4">
            {streams.length > 0 ? streams.map((stream: any, i: number) => (
              <div key={i} className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl group hover:bg-red-500/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">LIVE NOW</span>
                  <span className="text-gray-500 text-xs">{stream.sport || 'Match'}</span>
                </div>
                <h3 className="font-bold text-lg mb-4">{stream.title}</h3>
                <a 
                  href={stream.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-white text-black py-3 rounded-xl font-black text-sm flex items-center justify-center group-hover:bg-primary transition-colors"
                >
                  <PlayCircle className="mr-2 h-4 w-4" /> WATCH STREAM
                </a>
              </div>
            )) : (
              <div className="p-12 text-center text-gray-500 border border-white/5 rounded-3xl">
                No active streams found.
              </div>
            )}
          </div>
          
          {/* Sports Categories Card */}
          <div className="bg-[#111111] p-8 rounded-3xl border border-white/5">
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <Users className="text-primary h-5 w-5" />
              TOP CATEGORIES
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {['Football', 'Basketball', 'Tennis', 'Boxing', 'UFC', 'Cricket'].map(cat => (
                <div key={cat} className="bg-white/5 p-3 rounded-xl text-center text-sm font-bold hover:bg-primary hover:text-black transition-all cursor-pointer">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}