import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
<<<<<<< HEAD
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import TournamentPage from './pages/TournamentPage';
import Register from './pages/Register';
import Login from './pages/Login';
=======
import Contact from './pages/Contact';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import TournamentPage from './pages/TournamentPage';
>>>>>>> 39224d5f9c872b6bc0293d4ecb9b772d5dd01146

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
<<<<<<< HEAD
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/tournament" element={<TournamentPage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
=======
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/Register" element={<RegisterPage/>}/>
          <Route path='/Login' element={< LoginPage/>} />
        </Routes>
>>>>>>> 39224d5f9c872b6bc0293d4ecb9b772d5dd01146
      </div>
    </Router>
  );
};

export default App;
