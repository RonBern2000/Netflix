import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/landing' element={<LandingPage />} />
          <Route path='*' element={<Navigate to='/landing' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
