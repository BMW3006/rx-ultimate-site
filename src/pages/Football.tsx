import { useState, useEffect } from 'react';
import { callAPI } from '../lib/api';
import { Trophy, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

type FootballTab = 'live' | 'epl';

export function Football() {
  const [activeTab, setActiveTab] = useState<FootballTab>('live');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === 'live' ? '/football/livescore' : '/football/epl/matches';
      const res = await callAPI(endpoint);
      
      // Map based on API response structure
      const matches = res.result?.matches || res.result || [];
      setData(Array.isArray(matches) ? matches : []);
    } catch (err) {
      setError('Failed to fetch football data. Please try again later.');
      toast.error('Error fetching results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-4xl font-black text-white flex items-center">
          <Trophy className="mr-3 text-primary h-10 w-10" />
          FOOTBALL CENTRAL
        </h1>
        
        <div className="flex bg-[#111111] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'live' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Live Scores
          </button>
          <button
            onClick={() => setActiveTab('epl')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'epl' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            EPL Matches
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="spinner mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading football results...</p>
        </div>
      ) : error ? (
        <div className="error-message max-w-lg mx-auto flex items-center justify-center gap-3">
          <AlertCircle />
          <span>{error}</span>
        </div>
      ) : data.length === 0 ? (
        <div className="empty-state max-w-lg mx-auto text-center">
          No matches being played right now.
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((match, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#111111] p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all card-hover"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-tighter text-primary bg-primary/10 px-2 py-1 rounded">
                  {match.league || (activeTab === 'epl' ? 'Premier League' : 'Match')}
                </span>
                <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {match.time || 'Time unknown'}
                </span>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-white truncate max-w-[120px]">{match.homeTeam || match.home_name || 'Home'}</span>
                  <span className="text-2xl font-black text-primary px-3">{match.homeScore ?? match.score?.split('-')[0] ?? 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-white truncate max-w-[120px]">{match.awayTeam || match.away_name || 'Away'}</span>
                  <span className="text-2xl font-black text-primary px-3">{match.awayScore ?? match.score?.split('-')[1] ?? 0}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  match.status === 'LIVE' ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 text-gray-400'
                }`}>
                  {match.status || (activeTab === 'epl' ? 'FT' : 'LIVE')}
                </span>
                <button className="text-primary text-xs font-black uppercase hover:underline">Statistics</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}