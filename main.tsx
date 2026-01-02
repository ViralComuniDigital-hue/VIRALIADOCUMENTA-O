import ReactDOM from 'react-dom/client'
import App from './src/App'
import { ToastProvider } from './src/context/ToastContext'
import { AuthProvider } from './src/context/AuthContext'
import { CompanyProvider } from './src/context/CompanyContext'
import { SessionProvider } from './src/context/SessionContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <AuthProvider>
      <CompanyProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </CompanyProvider>
    </AuthProvider>
  </ToastProvider>
)