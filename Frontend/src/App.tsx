import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { useAppSelector } from './store/store';
import Registration from './pages/Registration';
import Regform from './pages/Regform';
import Payment from './pages/Payment';
import Signup from './pages/Signup';
import Browse from './pages/Browse';
import Login from './pages/Login';

function App() {

  //TODO: Check the user that entered our site => isAuthenticated or active or nor
  const { isAuthenticated, isActive } = useAppSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unauthenticated Users */}
          {!isAuthenticated && !isActive ? (
            <>
              <Route path='/landing' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup/registration' element={<Registration />} />
              <Route path='/signup/regform' element={<Regform />} />
              <Route path='*' element={<Navigate to='/landing' />} />
            </>
          ) : null}

          {/* Authenticated but Not Active Users */}
          {isAuthenticated && !isActive ? (
            <>
              <Route path='/landing' element={<LandingPage />} /> {/* TODO: if a user is logged in but not active then the propmt for the email wont appear but a continue to signup */}
              <Route path='/signup' element={<Signup />} />
              <Route path='/signup/payment' element={<Payment />} />
              <Route path='*' element={<Navigate to='/signup' />} />
            </>
          ) : null}

          {/* Fully Authenticated and Active Users */}
          {isAuthenticated && isActive ? (
            <>
              <Route path='/browse' element={<Browse />} />
              <Route path='*' element={<Navigate to='/browse' />} />
            </>
          ) : null}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
