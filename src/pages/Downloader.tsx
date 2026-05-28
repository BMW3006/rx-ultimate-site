import { useState } from 'react';
import { callAPI } from '../lib/api';
import { Download, Youtube, Smartphone, Instagram, Link2, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

type Platform = 'yt_mp3' | 'yt_mp4' | 'tiktok' | 'insta' | 'insta_nex';

export function Downloader() {
  const [platform, setPlatform] = useState<Platform>('yt_mp4');
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('720p');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDownload = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL first');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let endpoint = '';
      let params: any = { url };
      let provider: 'gifted' | 'nexoracle' = 'gifted';

      switch (platform) {
        case 'yt_mp3': endpoint = '/download/savetubemp3'; break;
        case 'yt_mp4': 
          endpoint = '/download/ytmp4'; 
          params.quality = quality;
          break;
        case 'tiktok': endpoint = '/download/tiktokdlv5'; break;
        case 'insta': endpoint = '/download/instadl'; break;
        case 'insta_nex': 
          endpoint = '/downloader/insta'; 
          provider = 'nexoracle';
          break;
      }

      const res = await callAPI(endpoint, params, provider);
      const downloadUrl = res.result?.download_url || res.result?.url || res.url || (res.data && res.data[0]?.url);
      
      if (downloadUrl) {
        setResult({ ...res.result, downloadUrl, title: res.result?.title || res.caption || 'Media File', thumbnail: res.result?.thumbnail || res.thumbnail });
        toast.success('Link found successfully!');
      } else {
        throw new Error('Link not found');
      }
    } catch (err) {
      toast.error('Failed to get link. Make sure the URL is correct.');
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    { id: 'yt_mp4', label: 'YouTube MP4', icon: Youtube, color: 'text-red-500' },
    { id: 'yt_mp3', label: 'YouTube MP3', icon: Youtube, color: 'text-red-400' },
    { id: 'tiktok', label: 'TikTok', icon: Smartphone, color: 'text-cyan-400' },
    { id: 'insta', label: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'insta_nex', label: 'Insta (Nex)', icon: Instagram, color: 'text-purple-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen text-white">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 flex items-center justify-center gap-4">
          <Download className="text-primary h-12 w-12" /> MEDIA DOWNLOADER
        </h1>
        <p className="text-gray-400 text-lg">Download media from all over the world using RX Ultimate technology.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setPlatform(p.id as Platform);
              setResult(null);
            }}
            className={`px-6 py-4 rounded-2xl border transition-all flex items-center gap-3 ${
              platform === p.id 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-[#111111] border-white/5 text-gray-500 hover:text-white'
            }`}
          >
            <p.icon className={`h-6 w-6 ${platform === p.id ? p.color : ''}`} />
            <span className="font-bold text-xs uppercase tracking-widest whitespace-nowrap">{p.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#111111] p-8 rounded-[2rem] border border-white/10 shadow-2xl space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Enter Media Link</label>
          <div className="relative group">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={`Enter ${platform.replace('_', ' ').toUpperCase()} link here...`}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:border-primary outline-none transition-all text-lg text-white"
            />
          </div>
        </div>

        {platform === 'yt_mp4' && (
          <div className="flex flex-wrap gap-2 justify-center">
            {['144p', '360p', '480p', '720p', '1080p'].map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  quality === q ? 'bg-primary text-black' : 'bg-white/5 text-gray-500 hover:text-white'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-primary text-black py-5 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : (
            <>
              <Download className="h-6 w-6" /> PROCESS LINK
            </>
          )}
        </button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-2 text-primary font-black">
                <CheckCircle2 className="h-6 w-6" /> YOUR FILE IS READY!
              </div>
              
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5 w-full flex flex-col md:flex-row items-center gap-6">
                {result.thumbnail && (
                  <img src={result.thumbnail} className="w-40 rounded-xl shadow-lg border border-white/10" alt="Thumbnail" />
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{result.title}</h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400">Media: {platform.toUpperCase()}</span>
                    {result.size && <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400">Size: {result.size}</span>}
                  </div>
                </div>
                <a
                  href={result.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-black px-10 py-4 rounded-xl font-black hover:scale-110 transition-transform whitespace-nowrap"
                >
                  DOWNLOAD
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}