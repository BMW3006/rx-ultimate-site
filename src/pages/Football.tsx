import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import { Search, Trophy, Calendar, ListOrdered, Newspaper, Loader2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

type Tab = 'live' | 'results' | 'standings' | 'news';

export function Football() {
  const [activeTab, setActiveTab] = useState<Tab>('live');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [subCategory, setSubCategory] = useState('EPL');

  const fetchData = async (tab: Tab, sub: string = '') => {
    setLoading(true);
    try {
      let endpoint = '';
      let params = {};

      switch (tab) {
        case 'live':
          endpoint = '/football/livescore';
          break;
        case 'results':
          endpoint = `/football/${sub.toLowerCase()}/matches`;
          break;
        case 'standings':
          endpoint = `/football/${sub.toLowerCase()}/standings`;
          break;
        case 'news':
          endpoint = '/football/news';
          break;
      }

      const res = await apiFetch(endpoint, params);
      setData(res.result || res.data || res);
    } catch (err) {
      toast.error('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab, subCategory);
  }, [activeTab]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    try {
      const res = await apiFetch('/football/team-search', { query: searchQuery });
      setData(res.result || res);
      setActiveTab('news'); // Visual hack to show search results
    } catch (err) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-4xl font-black text-white flex items-center">
          <Trophy className="mr-3 text-primary h-10 w-10" />
          FOOTBALL CENTRAL
        </h1>
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search teams or players..."
            className="w-full bg-[#111111] border border-white/10 rounded-full py-2 pl-10 pr-4 focus:border-primary outline-none transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto scrollbar-hide">
        {[
          { id: 'live', label: 'Live Scores', icon: Calendar },
          { id: 'results', label: 'League Results', icon: ListOrdered },
          { id: 'standings', label: 'Standings', icon: Trophy },
          { id: 'news', label: 'Latest News', icon: Newspaper },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center space-x-2 px-6 py-4 font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Sub-Tabs for Results/Standings */}
      {(activeTab === 'results' || activeTab === 'standings') && (
        <div className="flex flex-wrap gap-2">
          {['EPL', 'LaLiga', 'Bundesliga', 'SerieA', 'Ligue1', 'UCL'].map((league) => (
            <button
              key={league}
              onClick={() => {
                setSubCategory(league);
                fetchData(activeTab, league);
              }}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                subCategory === league ? 'bg-primary text-black border-primary' : 'border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {league}
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-gray-400">Fetching latest football data...</p>
        </div>
      ) : (
        <motion.div
          key={activeTab + subCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          {activeTab === 'live' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((match: any, i: number) => (
                  <div key={i} className="bg-[#111111] p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">LIVE</span>
                      <span className="text-xs text-gray-400">{match.time || 'Ongoing'}</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{match.home_name || 'Home'}</span>
                        <span className="text-2xl font-black text-primary">{match.score || '0 - 0'}</span>
                        <span className="font-bold text-lg text-right">{match.away_name || 'Away'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500 italic">No live matches at the moment.</div>
              )}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data) && data.map((item: any, i: number) => (
                <div key={i} className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 group card-hover">
                  {item.image && <img src={item.image} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">{item.description}</p>
                    <button className="text-primary font-bold text-sm">Read Story</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'standings' || activeTab === 'results') && (
             <div className="bg-[#111111] rounded-2xl border border-white/5 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-white/5">
                     <tr>
                       <th className="px-6 py-4 font-bold text-sm text-gray-400 uppercase">Pos</th>
                       <th className="px-6 py-4 font-bold text-sm text-gray-400 uppercase">Team</th>
                       <th className="px-6 py-4 font-bold text-sm text-gray-400 uppercase">P</th>
                       <th className="px-6 py-4 font-bold text-sm text-gray-400 uppercase">W</th>
                       <th className="px-6 py-4 font-bold text-sm text-gray-400 uppercase">D</th>
                       <th className="px-6 py-4 font-bold text-sm text-gray-400 uppercase">L</th>
                       <th className="px-6 py-4 font-bold text-sm text-gray-400 uppercase">Pts</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {Array.isArray(data) ? data.map((row: any, i: number) => (
                       <tr key={i} className="hover:bg-white/5 transition-colors">
                         <td className="px-6 py-4 font-bold">{row.position || i + 1}</td>
                         <td className="px-6 py-4 font-bold">{row.name || row.team_name || 'Team'}</td>
                         <td className="px-6 py-4">{row.played || 0}</td>
                         <td className="px-6 py-4">{row.win || 0}</td>
                         <td className="px-6 py-4">{row.draw || 0}</td>
                         <td className="px-6 py-4">{row.lose || 0}</td>
                         <td className="px-6 py-4 font-bold text-primary">{row.points || 0}</td>
                       </tr>
                     )) : (
                       <tr><td colSpan={7} className="p-8 text-center text-gray-500">No standings data available.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          )}
        </motion.div>
      )}
    </div>
  );
}