import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Football } from './pages/Football';
import { AIHub } from './pages/AIHub';
import { Downloader } from './pages/Downloader';
import { Tools } from './pages/Tools';
import { Sports } from './pages/Sports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="football" element={<Football />} />
          <Route path="ai" element={<AIHub />} />
          <Route path="download" element={<Downloader />} />
          <Route path="tools" element={<Tools />} />
          <Route path="sports" element={<Sports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;