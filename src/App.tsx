import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginWithSteamButton from './LoginWithSteamButton';
import AuthCallback from './AuthCallback';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWithSteamButton />} />
        <Route path="/auth" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
