// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import Footer from './components/footer/Footer';
import LandingPage from './components/landingPage/LandingPage';
import About from './components/about/About';
import DonateNow from './components/donateNow/DonateNow';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import Contact from './components/contact/Contact';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import ResetPassword from './components/auth/ResetPassword';

import Admin from './pages/admin/Admin';
import Review from './components/review/Review';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          
          {/* Protected Route */}
          <Route 
            path="/donate-now" 
            element={
              <PrivateRoute>
                <DonateNow />
              </PrivateRoute>
            } 
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
