import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Home from './pages/Home';
import About from './pages/About';
import TournamentTeams from './components/Team'
import ContactUs from './pages/ContactUs';
// import RegisterPage from './pages/register';
import TournamentPage from './pages/TournamentPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/Teams" element={<TournamentTeams />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/tournament" element={<TournamentPage />} />
          {/* <Route path="/Register" element={<RegisterPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
