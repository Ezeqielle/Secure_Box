import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Route components
import BaseHome from './components/BaseHome';
import HomeDashboard from './components/HomeDashboard';
import Profile from './components/Profile';
import AccountsManagement from './components/AccountsManagement';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import NotFound404 from './components/NotFound404';
import ScanCreation from './components/ScanCreation';
import ProjectCreation from './components/ProjectCreation';
import ProjectDashboard from './components/ProjectDashboard';
import AccountEdit from './components/AccountEdit';
import Scan from './components/Scan';
import Vulnerability from './components/Vulnerability';
import VulnerabilitiesList from './components/VulnerabilitiesList';

import reportWebVitals from './reportWebVitals';

// CSS
import './index.css';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/fontawesome-all.min.css';
import './assets/fonts/font-awesome.min.css';
import './assets/fonts/fontawesome5-overrides.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseHome childComponent={<HomeDashboard />} />} />
          <Route path="/profile" element={<BaseHome childComponent={<Profile />} />} />
          <Route path="/accountsmanagement" element={<BaseHome childComponent={<AccountsManagement />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/pagenotfound" element={<NotFound404 />} />
          <Route path="/scancreation" element={<BaseHome childComponent={<ScanCreation />} />} />
          <Route path="/projectcreation" element={<BaseHome childComponent={<ProjectCreation />} />} />
          <Route path="/projectdashboard" element={<BaseHome childComponent={<ProjectDashboard />} />} />
          <Route path="/accountedit" element={<BaseHome childComponent={<AccountEdit />} />} />
          <Route path="/scan" element={<BaseHome childComponent={<Scan />} />} />
          <Route path="/vulnerability" element={<BaseHome childComponent={<Vulnerability />} />} />
          <Route path="/vulnerabilitiesList" element={<BaseHome childComponent={<VulnerabilitiesList />} />} />
        </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
