import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { Download, Youtube, Instagram, Facebook, Music, Smartphone, HardDrive, Share2, Loader2, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

type Platform = 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'spotify' | 'gdrive' | 'apk';

const platforms = [
  { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'hover:text-red-500' },
  { id: 'tiktok', label: 'TikTok', icon: Smartphone, color: 'hover:text-cyan-400' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'hover:text-pink-500' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'hover:text-blue-500' },
  { id: 'spotify', label: 'Spotify', icon: Music, color: 'hover:text-green-500' },
  { id: 'gdrive', label: 'G-Drive', icon: HardDrive, color: 'hover:text-yellow-500' },
  { id: 'apk', label: 'APK', icon: Share2, color: 'hover:text-primary' },
];

export function Downloader() {
  const [activePlatform, setActivePlatform] = useState<Platform>('youtube');
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('720p');
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    setLoading(true);
    setDownloadLink(null);
    try {
      let endpoint = '';
      let params: any = { url };

      switch (activePlatform) {
        case 'youtube':
          endpoint = quality === 'MP3' ? '/download/savetubemp3' : '/download/ytmp4';
          params = { url, quality };
          break;
        case 'tiktok': endpoint = '/download/tiktokdlv5'; break;
        case 'instagram': endpoint = '/download/instadl'; break;
        case 'facebook': endpoint = '/download/facebookv3'; break;
        case 'spotify': endpoint = '/download/spotifydlv4'; break;
        case 'gdrive': endpoint = '/download/gdrivedl'; break;
        case 'apk': 
          endpoint = '/download/apkdl';
          params = { query: url }; // Use query for APK search/download
          break;
      }

      const res = await apiFetch(endpoint, params);
      const link = res.result || res.url || res.data?.url || res.data?.download_url;
      
      if (link) {
        setDownloadLink(link);
        toast.success('Download link generated!');
      } else {
        toast.error('Could not find download link. Try another URL.');
      }
    } catch (err) {
      toast.error('Download service error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black mb-6 flex items-center justify-center gap-4">
          <Download className="text-primary h-12 w-12" />
          ULTIMATE DOWNLOADER
        </h1>
        <p className="text-gray-400 text-xl">Save your favorite media from across the web in seconds.</p>
      </div>

      <div className="space-y-8">
        {/* Platform Selection */}
        <div className="flex flex-wrap justify-center gap-4">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePlatform(p.id as Platform);
                setDownloadLink(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${
                activePlatform === p.id 
                  ? 'bg-primary text-black border-primary scale-105 shadow-[0_0_20px_rgba(0,229,255,0.3)]' 
                  : `bg-[#111111] text-gray-400 border-white/5 ${p.color}`
              }`}
            >
              <p.icon className="h-5 w-5" />
              <span className="font-bold">{p.label}</span>
            </button>
          ))}
        </div>

        {/* Input Card */}
        <div className="bg-[#111111] p-8 rounded-[2rem] border border-white/10 shadow-xl">
          <div className="space-y-6">
            <div className="relative">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder={`Paste ${activePlatform} URL here...`}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none text-lg transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {activePlatform === 'youtube' && (
              <div className="flex flex-wrap gap-2 justify-center">
                {['MP3', '144p', '360p', '480p', '720p', '1080p'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      quality === q ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'
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
              className="w-full bg-primary text-black py-4 rounded-2xl font-black text-xl hover:cyan-glow hover:scale-[1.02] transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin h-6 w-6 mr-2" />
              ) : (
                <>
                  <Download className="mr-2 h-6 w-6" /> PROCESS DOWNLOAD
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result */}
        {downloadLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 border border-primary/30 p-8 rounded-3xl text-center"
          >
            <h3 className="text-2xl font-black text-primary mb-4">SUCCESS! YOUR LINK IS READY</h3>
            <p className="text-gray-400 mb-6">Click the button below to start your download.</p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-black px-12 py-4 rounded-full font-black text-lg hover:scale-110 transition-transform"
            >
              <Download /> DOWNLOAD NOW
            </a>
          </motion.div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-500 text-sm">
        <div>
          <div className="text-primary mb-2 font-bold text-lg">1. Copy URL</div>
          <p>Go to your preferred platform and copy the link to the media you want.</p>
        </div>
        <div>
          <div className="text-primary mb-2 font-bold text-lg">2. Paste & Select</div>
          <p>Paste the link above and choose your desired format or quality.</p>
        </div>
        <div>
          <div className="text-primary mb-2 font-bold text-lg">3. Download</div>
          <p>Hit process and get your direct high-speed download link instantly.</p>
        </div>
      </div>
    </div>
  );
}