import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { QrCode, Type, Link as LinkIcon, Copy, Check, Loader2, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function Tools() {
  const [activeTool, setActiveTool] = useState<'qr' | 'fancy' | 'short'>('qr');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      let endpoint = '';
      let params: any = {};

      if (activeTool === 'qr') {
        endpoint = '/tools/createqr';
        params = { text: input };
      } else if (activeTool === 'fancy') {
        endpoint = '/tools/fancy';
        params = { text: input };
      } else if (activeTool === 'short') {
        endpoint = '/tools/tinyurl';
        params = { url: input };
      }

      const res = await apiFetch(endpoint, params);
      setResult(res.result || res.url || res);
    } catch (err) {
      toast.error('Tool processing failed.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-5xl font-black text-center mb-12 flex items-center justify-center gap-4">
        <Wand2 className="text-primary" /> DIGITAL TOOLS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { id: 'qr', label: 'QR Generator', icon: QrCode, desc: 'Create instant QR codes' },
          { id: 'fancy', label: 'Fancy Text', icon: Type, desc: 'Cool fonts for social media' },
          { id: 'short', label: 'URL Shortener', icon: LinkIcon, desc: 'Shorten long links fast' },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id as any);
              setResult(null);
              setInput('');
            }}
            className={`p-6 rounded-3xl border text-left transition-all ${
              activeTool === tool.id 
                ? 'bg-primary border-primary text-black shadow-lg scale-105' 
                : 'bg-[#111111] border-white/5 text-white hover:border-primary/50'
            }`}
          >
            <tool.icon className={`h-8 w-8 mb-4 ${activeTool === tool.id ? 'text-black' : 'text-primary'}`} />
            <div className="font-black text-lg">{tool.label}</div>
            <div className={`text-xs ${activeTool === tool.id ? 'text-black/70' : 'text-gray-400'}`}>{tool.desc}</div>
          </button>
        ))}
      </div>

      <div className="bg-[#111111] p-8 rounded-[2rem] border border-white/10 shadow-2xl space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-gray-500">
            {activeTool === 'qr' ? 'Enter Text or URL' : activeTool === 'fancy' ? 'Enter your Text' : 'Enter Long URL'}
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Type here..."
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAction()}
            />
            <button
              onClick={handleAction}
              disabled={loading}
              className="bg-primary text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'GENERATE'}
            </button>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-8 border-t border-white/5"
          >
            {activeTool === 'qr' && (
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-white rounded-2xl">
                   <img src={result} alt="QR Code" className="w-48 h-48" />
                </div>
                <button 
                  onClick={() => copyToClipboard(result)}
                  className="bg-white/10 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/20"
                >
                  <Copy className="h-4 w-4" /> Copy Image URL
                </button>
              </div>
            )}

            {activeTool === 'fancy' && Array.isArray(result) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.map((item: any, i: number) => (
                  <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center group">
                    <span className="text-xl font-medium truncate pr-4">{item.result || item}</span>
                    <button 
                      onClick={() => copyToClipboard(item.result || item)}
                      className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black"
                    >
                      {copied === (item.result || item) ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTool === 'short' && (
              <div className="flex flex-col items-center gap-6">
                <div className="text-3xl font-black text-primary break-all text-center">{result}</div>
                <button 
                  onClick={() => copyToClipboard(result)}
                  className="bg-primary text-black px-12 py-4 rounded-full font-black flex items-center gap-2 hover:scale-110 transition-transform"
                >
                  {copied === result ? <Check /> : <Copy />} {copied === result ? 'COPIED!' : 'COPY SHORT LINK'}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}