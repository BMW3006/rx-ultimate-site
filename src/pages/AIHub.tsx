import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { MessageSquare, Image as ImageIcon, Music, Send, Loader2, Download, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

type AITab = 'gpt' | 'gemini' | 'image' | 'song';

export function AIHub() {
  const [activeTab, setActiveTab] = useState<AITab>('gpt');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', content: string }[]>([]);
  const [result, setResult] = useState<any>(null);

  const handleAction = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      let endpoint = '';
      let params: any = { q: prompt };

      if (activeTab === 'gpt') endpoint = '/ai/gpt4o';
      else if (activeTab === 'gemini') endpoint = '/ai/gemini';
      else if (activeTab === 'image') {
        endpoint = '/ai/txt2img';
        params = { prompt };
      }
      else if (activeTab === 'song') {
        endpoint = '/tools/songgenerator';
        params = { query: prompt };
      }

      const res = await apiFetch(endpoint, params);
      
      if (activeTab === 'gpt' || activeTab === 'gemini') {
        const botMsg = res.result || res.data || "I am unable to answer that right now.";
        setChatHistory(prev => [...prev, { role: 'user', content: prompt }, { role: 'bot', content: botMsg }]);
        setPrompt('');
      } else {
        setResult(res.result || res.url || res);
      }
    } catch (err) {
      toast.error('AI Processing failed. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 flex items-center justify-center">
          <Bot className="mr-4 text-purple-400 h-12 w-12" />
          AI POWERHOUSE
        </h1>
        <p className="text-gray-400 text-lg">Unleash the power of multimodal artificial intelligence.</p>
      </div>

      <div className="bg-[#111111] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Hub Tabs */}
        <div className="flex bg-black/40 border-b border-white/10">
          {[
            { id: 'gpt', label: 'GPT-4o', icon: MessageSquare },
            { id: 'gemini', label: 'Gemini', icon: Bot },
            { id: 'image', label: 'Image Gen', icon: ImageIcon },
            { id: 'song', label: 'Song Gen', icon: Music },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as AITab);
                setResult(null);
                setChatHistory([]);
              }}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all ${
                activeTab === tab.id ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-white'
              }`}
            >
              <tab.icon className="h-6 w-6" />
              <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 min-h-[500px] flex flex-col">
          {(activeTab === 'gpt' || activeTab === 'gemini') ? (
            <>
              <div className="flex-1 space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                {chatHistory.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                    <Bot className="h-20 w-20 mb-4" />
                    <p>Start a conversation with {activeTab === 'gpt' ? 'GPT-4o' : 'Gemini'}</p>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user' ? 'bg-primary text-black font-medium' : 'bg-white/5 text-gray-200'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder={`Ask ${activeTab.toUpperCase()} anything...`}
                  className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                />
                <button
                  onClick={handleAction}
                  disabled={loading}
                  className="bg-primary text-black p-4 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8 flex-1">
              <div className="w-full max-w-lg space-y-4">
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest text-center">
                  Describe what you want to {activeTab === 'image' ? 'see' : 'hear'}
                </label>
                <div className="flex gap-4">
                   <input
                    type="text"
                    placeholder={activeTab === 'image' ? "A futuristic neon city..." : "A lo-fi hip hop beat..."}
                    className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                   <button
                    onClick={handleAction}
                    disabled={loading}
                    className="bg-primary text-black px-8 py-4 rounded-2xl font-bold flex items-center disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Generate'}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-2xl bg-black/20 p-8 rounded-3xl border border-white/5 text-center"
                  >
                    {activeTab === 'image' ? (
                      <div className="space-y-6">
                        <img src={result} alt="AI Generated" className="w-full rounded-2xl cyan-glow" />
                        <a 
                          href={result} 
                          download 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-all"
                        >
                          <Download className="h-5 w-5" /> Download HD Image
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-primary/20 p-12 rounded-full inline-block mb-4">
                          <Music className="h-16 w-16 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Your Song is Ready!</h3>
                        <audio controls className="w-full filter invert hue-rotate-180">
                          <source src={result} type="audio/mpeg" />
                        </audio>
                        <a 
                          href={result} 
                          download 
                          className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                          <Download className="h-5 w-5" /> Download Audio
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}