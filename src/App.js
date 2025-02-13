import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HealthHistory from './components/HealthHistory';
import LandingPage from './components/Landing';
import Login from './components/Login';
import UpdateUserInfo from './components/UpdateUserInfo';
import UserDashboard from './components/UserDashboard';
import UserLoginPage from './components/UserLogin';
import UserSignupPage from './components/UserSignup';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userlogin" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/healthhistory" element={<HealthHistory />} />
        <Route path="/updateuserinfo" element={<UpdateUserInfo />} />

      </Routes>
    </Router>
  );
}

export default App;
