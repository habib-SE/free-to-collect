import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import Footer from './components/footer/Footer';
import LandingPage from './components/landingPage/LandingPage';
import About from './components/about/About';
import DonateNow from './components/donateNow/DonateNow';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Contact from './components/contact/Contact';
import PrivateRoute from './components/privateRoute/PrivateRoute';



function App() {
  return (
    <div>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
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
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
