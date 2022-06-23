import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Route components
import UserNavbar from './components/UserNavbar';
import Home from './components/Home';
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

// Default render
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
    <div id="wrapper">
      <Navbar />
      <div className="d-flex flex-column" id="content-wrapper">
        <Routes>
          <Route path="/" element={<UserNavbar childComponent={<Home />} />} />
          <Route path="/profile" element={<UserNavbar childComponent={<Profile />} />} />
          <Route path="/accountsmanagement" element={<UserNavbar childComponent={<AccountsManagement />} />} />
          <Route path="/login" element={<UserNavbar childComponent={<Login />} />} />
          <Route path="/register" element={<UserNavbar childComponent={<Register />} />} />
          <Route path="/forgotpassword" element={<UserNavbar childComponent={<ForgotPassword />} />} />
          <Route path="/pagenotfound" element={<UserNavbar childComponent={<NotFound404 />} />} />
          <Route path="/scancreation" element={<UserNavbar childComponent={<ScanCreation />} />} />
          <Route path="/projectcreation" element={<UserNavbar childComponent={<ProjectCreation />} />} />
          <Route path="/projectdashboard" element={<UserNavbar childComponent={<ProjectDashboard />} />} />
          <Route path="/accountedit" element={<UserNavbar childComponent={<AccountEdit />} />} />
          <Route path="/scan" element={<UserNavbar childComponent={<Scan />} />} />
          <Route path="/vulnerability" element={<UserNavbar childComponent={<Vulnerability />} />} />
          <Route path="/vulnerabilitiesList" element={<UserNavbar childComponent={<VulnerabilitiesList />} />} />
        </Routes>
        <Footer />
      </div>
      <a className="border rounded d-inline scroll-to-top" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
    <script src="./assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="./assets/js/chart.min.js"></script>
    <script src="./assets/js/bs-init.js"></script>
    <script src="./assets/js/theme.js"></script>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
