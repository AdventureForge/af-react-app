import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import UserAccount from './pages/UserAccount';

const App = () => {
  const allowedRoles = ['user'];
  return (
    <div className="bg-slate-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<ProtectedRoute allowedRoles={allowedRoles} />}>
          <Route path="/account" element={<UserAccount />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
