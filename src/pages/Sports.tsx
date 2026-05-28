import { useState, useEffect } from 'react';
import { callAPI } from '../lib/api';
import { Activity, Radio, PlayCircle, Loader2, AlertCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function Sports() {
  const [data, setData] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSportsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [basketRes, streamRes] = await Promise.all([
        callAPI('/basketball/livescore'),
        callAPI('/sports/live', { category: 'football' })
      ]);
      
      setData(basketRes.result?.matches || basketRes.result || []);
      setStreams(streamRes.result || []);
    } catch (err) {
      setError('Failed to get sports data at this time.');
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSportsData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen text-white">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-5xl font-black flex items-center gap-4">
          <Activity className="text-primary h-12 w-12" /> MULTI-SPORTS
        </h1>
        <button 
          onClick={fetchSportsData}
          className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
        >
          Refresh Feed
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basketball Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tighter">
            <div className="w-1.5 h-6 bg-primary" /> Basketball Live
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-3xl border border-white/5">
              <Loader2 className="animate-spin text-primary h-10 w-10 mb-4" />
              <p className="text-gray-500">Searching for basketball matches...</p>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : data.length === 0 ? (
            <div className="empty-state">No basketball matches currently live.</div>
          ) : (
            <div className="grid gap-4">
              {data.map((game, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#111111] p-6 rounded-2xl border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                      <span className="text-primary">{game.league || 'LEAGUE'}</span> • {game.status || 'LIVE'}
                    </div>
                    <div className="flex items-center justify-between pr-8">
                      <div className="space-y-2">
                        <div className="text-xl font-bold text-white">{game.homeTeam || game.home_name || 'Team A'}</div>
                        <div className="text-xl font-bold text-white">{game.awayTeam || game.away_name || 'Team B'}</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-black text-primary">{game.homeScore || 0}</div>
                        <div className="text-2xl font-black text-primary">{game.awayScore || 0}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Live Streams Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tighter text-red-500">
            <Radio className="animate-pulse" /> Live Streams
          </h2>

          <div className="space-y-4">
            {streams.length > 0 ? streams.map((stream, i) => (
              <div key={i} className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl group hover:bg-red-500/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">LIVE NOW</span>
                  <span className="text-gray-500 text-xs font-bold uppercase">{stream.sport || 'Match'}</span>
                </div>
                <h3 className="font-bold text-lg mb-4 text-white line-clamp-2">{stream.title}</h3>
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
                {loading ? 'Loading streams...' : 'No live streams found.'}
              </div>
            )}
          </div>

          <div className="bg-[#111111] p-8 rounded-3xl border border-white/5">
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <Users className="text-primary h-5 w-5" /> TOP CATEGORIES
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