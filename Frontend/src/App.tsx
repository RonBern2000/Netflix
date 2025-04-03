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
import Mylist from './pages/Mylist';

function App() {

  //TODO: Check the user that entered our site => isAuthenticated or active or nor
  const { isAuthenticated, isActive, email } = useAppSelector((state) => state.auth);
  //TODO: Ping pong to server to check who is the current user
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unauthenticated Users  consider removing isActive here redandent*/}
          {!isAuthenticated && !isActive && !email ? (
            <>
              <Route path='/landing' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Navigate to='/landing' />} />
            </>
          ) : null}

          {/* Signup Flow: Only if an email exists */}
          {!isAuthenticated && !isActive && email ? (
            <>
              <Route path='/landing' element={<LandingPage />} />
              <Route path='/signup/registration' element={<Registration />} />
              <Route path='/signup/regform' element={<Regform />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Navigate to='/landing' />} />
            </>
          ) : null}

          {/* Authenticated but Not Active Users */}
          {isAuthenticated && !isActive ? (
            <>
              <Route path='/landing' element={<LandingPage />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signup/payment' element={<Payment />} />
              <Route path='*' element={<Navigate to='/signup' />} />
            </>
          ) : null}

          {/* Fully Authenticated and Active Users */}
          {isAuthenticated && isActive ? (
            <>
              <Route path='/browse/mylist' element={<Mylist />} />
              <Route path='*' element={<Navigate to='/browse' />} />
            </>
          ) : null}
          <Route path='/browse' element={<Browse />} /> {/* Move it up, here just for testing */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
