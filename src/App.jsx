import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router';
import BottomNavbar from './components/Navbar/BottomNavbar';
import HomeView from './Views/HomeView/HomeView';
import LoadSpoolView from './Views/LoadSpoolView/LoadSpoolView';
import SettingsView from './Views/SettingsView/SettingsView';
import ArchivedView from './Views/ArchivedView/ArchivedView';
import { registerSW } from 'virtual:pwa-register';
import SpoolDetailView from './Views/SpoolDetailView/SpoolDetailView';
import { isDemoMode, setupDemoAxios } from './services/demoInterceptor';

// Initialize demo adapter before initial render
if (isDemoMode()) {
  setupDemoAxios();
}

function App() {
  const [demoActive] = useState(() => isDemoMode());

  useEffect(() => {
    // Only register PWA Service Worker when opened directly (not inside a portfolio iframe)
    if (window.self === window.top) {
      registerSW({ immediate: true });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {demoActive && (
        <div className="bg-amber-950/90 border-b border-amber-400/30 px-4 py-1.5 text-center text-xs text-amber-200">
          Interactive Demo Mode — Exploring sample film rolls &amp; shots (changes stay in your browser session)
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/spool/new" element={<LoadSpoolView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/Archived" element={<ArchivedView />} />
          <Route path="/spool/:id" element={<SpoolDetailView />} />
        </Routes>
        <BottomNavbar />
      </BrowserRouter>
    </div>
  );
}

export default App;