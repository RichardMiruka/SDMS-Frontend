import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import RegisterPage from './pages/register';
import TournamentPage from './pages/TournamentPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/Register" element={<RegisterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
