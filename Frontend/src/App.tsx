import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { useAppDispatch, useAppSelector } from './store/store';
import Registration from './pages/Registration';
import Regform from './pages/Regform';
import Payment from './pages/Payment';
import Signup from './pages/Signup';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Mylist from './pages/Mylist';
import { useCheckStatusQuery } from './store/slices/authApiSlice';
import { useEffect } from 'react';
import { logout, setStatus } from './store/slices/authSlice';
import Search from './pages/Search';

function App() {

  //TODO: export it to a custom Hook that will export the 3 props we need (isAuthenticated && isActive && email). All the routes will be a component that will ask for these props and will display accorrdingly
  const dispatch = useAppDispatch();
  const { isAuthenticated, isActive, email } = useAppSelector((state) => state.auth);
  const { data, isSuccess, isError } = useCheckStatusQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setStatus(data));
    } else if (isError) {
      dispatch(logout());
    }
  }, [data, isSuccess, isError, dispatch]);

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
              <Route path='/browse' element={<Browse />} />
              <Route path='/browse/mylist' element={<Mylist />} />
              <Route path='/search' element={<Search />} />
              <Route path='*' element={<Navigate to='/browse' />} />
            </>
          ) : null}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
