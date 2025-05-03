import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Registration from '../pages/Registration';
import Regform from '../pages/Regform';
import Payment from '../pages/Payment';
import Signup from '../pages/Signup';
import Browse from '../pages/Browse';
import Login from '../pages/Login';
import Mylist from '../pages/Mylist';
import Search from '../pages/Search';

type AppRoutesProps = {
  isAuthenticated: boolean;
  isActive: boolean;
  email: string;
}

const AppRoutes = ({ isAuthenticated, isActive, email }: AppRoutesProps) => {
  // Unauthenticated Users
  if (!isAuthenticated && !isActive && !email) {
    return (
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    );
  }

  // Signup Flow: Only if an email exists
  if (!isAuthenticated && !isActive && email) {
    return (
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup/registration" element={<Registration />} />
        <Route path="/signup/regform" element={<Regform />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    );
  }

  // Authenticated but Not Active Users
  if (isAuthenticated && !isActive) {
    return (
      <Routes>
        <Route path="/signup/payment" element={<Payment />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    );
  }

  // Fully Authenticated and Active Users
  if (isAuthenticated && isActive) {
    return (
      <Routes>
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/mylist" element={<Mylist />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/browse" />} />
      </Routes>
    );
  }

  // Fallback in case none of the conditions match (shouldn't happen)
  return (
    <Routes>
      <Route path="/signup/payment" element={<Payment />} />
      <Route path="*" element={<Navigate to="/landing" />} />
    </Routes>
  );
};

export default AppRoutes;