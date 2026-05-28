export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black text-primary mb-4 cyan-text-glow">RX ULTIMATE</h2>
            <p className="text-gray-400 max-w-sm">
              The ultimate destination for sports live scores, AI-powered tools, and digital downloads. 
              Modern structure, ultimate speed.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/football" className="hover:text-primary transition-colors">Football News</a></li>
              <li><a href="/ai" className="hover:text-primary transition-colors">AI Generator</a></li>
              <li><a href="/download" className="hover:text-primary transition-colors">Downloader</a></li>
              <li><a href="/tools" className="hover:text-primary transition-colors">Digital Tools</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} RX ULTIMATE. Powered by GiftedTech.
        </div>
      </div>
    </footer>
  );
}