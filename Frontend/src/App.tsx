import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/landing' element={<LandingPage />} />
          <Route path='*' element={<Navigate to='/landing' />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
