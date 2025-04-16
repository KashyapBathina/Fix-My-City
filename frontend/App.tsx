import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IssuePage from './pages/IssuePage';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LoginPage />} />
	<Route path="/register" element={<RegisterPage />} />
        <Route path="/issue" element={<IssuePage />} />
      </Routes>
    </Router>
  );
}
export default App;
