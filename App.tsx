import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import PublicProposalViewer from './components/PublicProposalViewer';

import Terms from './pages/Legal/Terms';
import Privacy from './pages/Legal/Privacy';
import SaaSContract from './pages/Legal/SaaSContract';

import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';
import { SessionProvider } from './context/SessionContext';
import { ToastProvider } from './context/ToastContext';

import { useWhiteLabel } from './hooks/useWhiteLabel';
import { GlobalSettings } from './types';

const DEFAULT_SETTINGS: GlobalSettings = {
  logoUrl: null,
  mascotUrl: null,
  mainTitle: 'IA VIRAL GERAÇÃO DOCUMENTAÇÃO',
  mainSubtitle: 'Terminal de elite para gestão de documentação artística e rider técnico.',
  developerBrand: 'SISTEMA DESENVOLVIDO POR',
  developerName: 'VIRAL COMUNICAÇÃO DIGITAL',
  enableStrictCompliance: true,
};

/* =======================
   LOGIN PAGE (WRAPPER)
======================= */
function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { config } = useWhiteLabel();

  useEffect(() => {
    if (user) navigate('/app');
  }, [user, navigate]);

  return (
    <AuthModal
      onLogin={() => navigate('/app')}
      onClose={() => navigate('/')}
      logoUrl={config?.logoUrl || null}
    />
  );
}

/* =======================
   ROUTES
======================= */
function AppRoutes() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { config } = useWhiteLabel();

  const effectiveSettings: GlobalSettings = {
    ...DEFAULT_SETTINGS,
    logoUrl: config?.logoUrl || DEFAULT_SETTINGS.logoUrl,
  };

  // Public token viewer
  const params = new URLSearchParams(window.location.search);
  const publicToken = params.get('public_token');
  if (publicToken) {
    return <PublicProposalViewer token={publicToken} />;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Routes>

      {/* Landing pública */}
      <Route
        path="/"
        element={
          <LandingPage
            onAccess={() => navigate('/login')}
            settings={effectiveSettings}
            onNavigate={(view) => navigate(`/${view}`)}
          />
        }
      />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* App protegido */}
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <Dashboard
              onLogout={handleLogout}
              globalSettings={effectiveSettings}
              onUpdateSettings={() => {}}
            />
          </ProtectedRoute>
        }
      />

      {/* Legal */}
      <Route path="/terms" element={<Terms onBack={() => navigate('/')} />} />
      <Route path="/privacy" element={<Privacy onBack={() => navigate('/')} />} />
      <Route path="/saas_contract" element={<SaaSContract onBack={() => navigate('/')} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

/* =======================
   APP ROOT
======================= */
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <SessionProvider>
            <CompanyProvider>
              <AppRoutes />
            </CompanyProvider>
          </SessionProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}