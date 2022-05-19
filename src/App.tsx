import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import UserAccount from './pages/UserAccount';

const App = () => {
  const allowedRolesUser = ['user'];
  const allowedRolesAdmin = ['Admin'];
  return (
    <div className="bg-slate-900 min-h-screen">
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* PRIVATE ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={allowedRolesUser} />}>
          <Route path="/account" element={<UserAccount />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={allowedRolesAdmin} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
