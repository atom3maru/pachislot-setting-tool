import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDarkMode } from './hooks/useDarkMode';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import MachinePage from './pages/MachinePage';
import FeedbackPage from './pages/FeedbackPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

// 機種設定のインポート
import kabaneriConfig from './machines/kabaneri/config';
import enenConfig from './machines/enen/config';
import uminekoConfig from './machines/umineko/config';
import koukakuConfig from './machines/koukaku/config';
import hokutoConfig from './machines/hokuto/config';
import ghoulConfig from './machines/ghoul/config';
import hanahanaConfig from './machines/hanahana/config';
import okidokiBlackConfig from './machines/okidoki_black/config';
import hokutoOriginalConfig from './machines/hokuto_original/config';
import valvrave2Config from './machines/valvrave2/config';
import okidokiDuoConfig from './machines/okidoki_duo/config';
import monkeyturnConfig from './machines/monkeyturn/config';
import magirecoConfig from './machines/magireco/config';
import onimusha3Config from './machines/onimusha3/config';
import tokyorevengersConfig from './machines/tokyorevengers/config';
import bancho4Config from './machines/bancho4/config';
import tekken6Config from './machines/tekken6/config';
import monhunriseConfig from './machines/monhunrise/config';
import godeaterConfig from './machines/godeater/config';
import sbjConfig from './machines/sbj/config';
import mushokutenseiConfig from './machines/mushokutensei/config';

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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/kabaneri" element={<MachinePage config={kabaneriConfig} />} />
          <Route path="/enen" element={<MachinePage config={enenConfig} />} />
          {/* ミリオンゴッドは未導入のため無効化 */}
          <Route path="/milliongod" element={<Navigate to="/" replace />} />
          <Route path="/umineko" element={<MachinePage config={uminekoConfig} />} />
          <Route path="/koukaku" element={<MachinePage config={koukakuConfig} />} />
          <Route path="/hokuto" element={<MachinePage config={hokutoConfig} />} />
          <Route path="/ghoul" element={<MachinePage config={ghoulConfig} />} />
          <Route path="/hanahana" element={<MachinePage config={hanahanaConfig} />} />
          <Route path="/okidoki_black" element={<MachinePage config={okidokiBlackConfig} />} />
          <Route path="/hokuto_original" element={<MachinePage config={hokutoOriginalConfig} />} />
          <Route path="/valvrave2" element={<MachinePage config={valvrave2Config} />} />
          <Route path="/okidoki_duo" element={<MachinePage config={okidokiDuoConfig} />} />
          <Route path="/monkeyturn" element={<MachinePage config={monkeyturnConfig} />} />
          <Route path="/magireco" element={<MachinePage config={magirecoConfig} />} />
          <Route path="/onimusha3" element={<MachinePage config={onimusha3Config} />} />
          <Route path="/tokyorevengers" element={<MachinePage config={tokyorevengersConfig} />} />
          <Route path="/bancho4" element={<MachinePage config={bancho4Config} />} />
          <Route path="/tekken6" element={<MachinePage config={tekken6Config} />} />
          <Route path="/monhunrise" element={<MachinePage config={monhunriseConfig} />} />
          <Route path="/godeater" element={<MachinePage config={godeaterConfig} />} />
          <Route path="/sbj" element={<MachinePage config={sbjConfig} />} />
          <Route path="/mushokutensei" element={<MachinePage config={mushokutenseiConfig} />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}

export default App;
