import { Link } from "react-router-dom";
import Session from 'react-session-api'
Session.config(true, 60)

const Navbar = () => (
  <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
    <div className="container-fluid d-flex flex-column p-0">
      <a
        className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
        href="./src"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          <span>Secure Box</span>
        </div>
      </a>
      <ul className="navbar-nav text-light" id="accordionSidebar">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/accountedit/"+Session.get("username")} className="nav-link">
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/accountsmanagement" className="nav-link">
            <i className="fas fa-table"></i>
            <span>Accounts</span>
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/forgotpassword" className="nav-link">
            <i className="fas fa-key"></i>
            <span>Forgotten Password</span>
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/scancreation" className="nav-link">
            <i className="fas fa-window-maximize"></i>
            <span>Scan Creation</span>
          </Link>
          <Link to="/projectcreation" className="nav-link">
            <i className="fas fa-window-maximize"></i>
            <span>Project Creation</span>
          </Link>
          <Link to="/projectdashboard" className="nav-link">
            <i className="fas fa-window-maximize"></i>
            <span>Project Dashboard</span>
          </Link>
          <Link to="/scan" className="nav-link">
            <i className="fas fa-window-maximize"></i>
            <span>scan</span>
          </Link>
          <Link to="/vulnerability" className="nav-link">
            <i className="fas fa-window-maximize"></i>
            <span>Vulnerability</span>
          </Link>
        </li>
      </ul>
      <div className="text-center d-none d-md-inline">
        <button
          className="btn rounded-circle border-0"
          id="sidebarToggle"
          type="button"
        ></button>
      </div>
    </div>
  </nav>
)

export default Navbar;