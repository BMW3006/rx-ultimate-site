import { useState, useRef, useEffect } from 'react';
import { callAPI } from '../lib/api';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

type AIModel = 'gpt4o' | 'gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIHub() {
  const [model, setModel] = useState<AIModel>('gpt4o');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const endpoint = model === 'gpt4o' ? '/ai/gpt4o' : '/ai/gemini';
      const res = await callAPI(endpoint, { q: userMessage });
      
      const botResponse = res.result || 'Sorry, I could not get an answer at this time.';
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (err) {
      toast.error('Failed to communicate with AI');
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black flex items-center gap-2">
          <Sparkles className="text-primary" /> AI STUDIO
        </h1>
        
        <div className="flex bg-[#111111] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setModel('gpt4o')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              model === 'gpt4o' ? 'bg-primary text-black' : 'text-gray-400'
            }`}
          >
            GPT-4o
          </button>
          <button
            onClick={() => setModel('gemini')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              model === 'gemini' ? 'bg-primary text-black' : 'text-gray-400'
            }`}
          >
            Gemini
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#111111] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <Bot className="h-16 w-16 text-primary" />
              <p className="max-w-xs font-medium text-white">
                Hello! I am your AI assistant. Ask me anything in English or any other language.
              </p>
            </div>
          )}
          
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-2 rounded-full ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400'}`}>
                    {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' ? 'bg-primary text-black font-medium' : 'bg-white/5 text-gray-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                <div className="spinner h-4 w-4"></div>
                <span className="text-xs text-gray-500 italic">AI is thinking...</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 bg-black/40 border-t border-white/5">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${model.toUpperCase()} anything here...`}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-white"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-primary text-black p-4 rounded-2xl font-bold hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}