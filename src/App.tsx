import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDarkMode } from './hooks/useDarkMode';
import HomePage from './pages/HomePage';
import MachinePage from './pages/MachinePage';
import FeedbackPage from './pages/FeedbackPage';

// 機種設定のインポート
import kabaneriConfig from './machines/kabaneri/config';
import enenConfig from './machines/enen/config';
import uminekoConfig from './machines/umineko/config';
import koukakuConfig from './machines/koukaku/config';
import hokutoConfig from './machines/hokuto/config';
import ghoulConfig from './machines/ghoul/config';
import hanahanaConfig from './machines/hanahana/config';

// ダークモードコンテキスト
export const DarkModeContext = createContext<{ isDark: boolean; toggle: () => void }>({
  isDark: false,
  toggle: () => {},
});

function App() {
  const darkMode = useDarkMode();

  return (
    <DarkModeContext.Provider value={darkMode}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/kabaneri" element={<MachinePage config={kabaneriConfig} />} />
          <Route path="/enen" element={<MachinePage config={enenConfig} />} />
          {/* ミリオンゴッドは未導入のため無効化 - 導入後にルートを復活させる */}
          <Route path="/milliongod" element={<Navigate to="/" replace />} />
          <Route path="/umineko" element={<MachinePage config={uminekoConfig} />} />
          <Route path="/koukaku" element={<MachinePage config={koukakuConfig} />} />
          <Route path="/hokuto" element={<MachinePage config={hokutoConfig} />} />
          <Route path="/ghoul" element={<MachinePage config={ghoulConfig} />} />
          <Route path="/hanahana" element={<MachinePage config={hanahanaConfig} />} />
        </Routes>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}

export default App;
