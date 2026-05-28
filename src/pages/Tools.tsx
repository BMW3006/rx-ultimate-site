import { useState } from 'react';
import { callAPI } from '../lib/api';
import { Type, Wand2, Copy, Check, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function Tools() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateStylish = async () => {
    if (!text.trim()) {
      toast.error('Please type words here');
      return;
    }

    setLoading(true);
    try {
      const res = await callAPI('/misc/stylish-text', { text }, 'nexoracle');
      const styles = res.result || [];
      setResults(Array.isArray(styles) ? styles : Object.values(styles));
      toast.success('Styles generated!');
    } catch (err) {
      toast.error('Failed to generate styles.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (val: string, index: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(index);
    toast.success('Copied!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-screen text-white">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 flex items-center justify-center gap-4">
          <Wand2 className="text-primary h-12 w-12" /> SMART TOOLS
        </h1>
        <p className="text-gray-400 text-lg">Generate attractive text for your social profiles.</p>
      </div>

      <div className="bg-[#111111] p-8 rounded-[2rem] border border-white/10 shadow-2xl mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateStylish()}
              placeholder="Type your text here..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:border-primary outline-none text-lg transition-all text-white"
            />
          </div>
          <button
            onClick={generateStylish}
            disabled={loading}
            className="bg-primary text-black px-12 py-5 rounded-2xl font-black text-lg hover:scale-[1.05] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="h-5 w-5" /> GENERATE</>}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {results.map((style, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className="bg-[#111111] p-6 rounded-2xl border border-white/5 group hover:border-primary/50 transition-all flex items-center justify-between"
              >
                <span className="text-xl font-medium text-white truncate pr-4">{style.result || style}</span>
                <button
                  onClick={() => copyToClipboard(style.result || style, i)}
                  className={`p-3 rounded-xl transition-all ${
                    copiedIndex === i ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-primary hover:text-black'
                  }`}
                >
                  {copiedIndex === i ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {results.length === 0 && !loading && (
        <div className="empty-state max-w-md mx-auto py-20 text-center text-gray-500 border border-dashed border-white/5 rounded-3xl">
          Type something above to see various text styles.
        </div>
      )}
    </div>
  );
}