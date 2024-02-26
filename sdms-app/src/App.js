import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Dashboard from './pages/dashboard';
import Home from './pages/Home';
import About from './pages/About';
import TournamentTeams from './components/Team'
import ContactUs from './pages/ContactUs';
import LoginPage from './pages/Login';
import TournamentPage from './pages/TournamentPage';
import EventList from './components/EventList';
import TeamList from './components/Team';
import PlayerList from './components/PlayerList'
import CoachList from './components/CoachList';
import EventPlayers from './components/event_players';
import Categories from './components/categories';
import TournamentBracket from './components/brackets';
import RegisterPage from './pages/Register';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';


const App = () => {
  return (
    <Router>
       <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="tournament" element={<ProtectedRoute><TournamentPage /></ProtectedRoute>} >
            <Route path='events' element={<EventList /> } />
            <Route path='category' element={<Categories />}/>
            <Route path='eventplayers' element={<EventPlayers />} />
            <Route path='Team' element={<TeamList />} />
            <Route path='Coaches' element={<CoachList />} />
            <Route path='players' element={<PlayerList />} />
            <Route path='coaches' element={<CoachList />} />
          </Route>
          <Route path='/bracket' element={<TournamentBracket />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path='/Login' element={< LoginPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
