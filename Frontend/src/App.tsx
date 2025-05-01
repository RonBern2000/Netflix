import './App.css';
import { BrowserRouter } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';

function App() {

  const { isAuthenticated, isActive, email } = useAuth();

  return (
    <>
      <BrowserRouter>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          isActive={isActive}
          email={email}
        />
      </BrowserRouter>
    </>
  )
}

export default App;
