import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainPanel from './pages/MainPanel';
import PayslipPage from './pages/PayslipPage';
import AdministrativeRules from './pages/AdministrativeRules';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <Router  >
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route 
          path="/panel" 
          element={
            <PrivateRoute>
              <MainPanel setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/payslip" 
          element={
            <PrivateRoute>
              <PayslipPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/administrative-rules" 
          element={
            <PrivateRoute>
              <AdministrativeRules />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;