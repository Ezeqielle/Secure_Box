import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import reportWebVitals from './reportWebVitals';

import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/fontawesome-all.min.css';
import './assets/fonts/font-awesome.min.css';
import './assets/fonts/fontawesome5-overrides.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id="wrapper">
      <Navbar />
      <div className="d-flex flex-column" id="content-wrapper">
        <Home />
        <Footer />
      </div>
      <a className="border rounded d-inline scroll-to-top" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
