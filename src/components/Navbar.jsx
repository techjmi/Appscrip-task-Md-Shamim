import React, { useContext, useState } from "react";
import { FaBars, FaTimes,} from "react-icons/fa";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { CiHeart, CiSearch, CiUser } from "react-icons/ci";
import headlinelogo from "../Assets/nav-top-logo.png";
import logo from "../Assets/Logo.png";
import { Badge } from "@mui/material";
import "../css/Navbar.css";
import { DataContext } from "../context/Dataprovider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(DataContext);

  return (
    <nav>
      <section className="top">
        <span className="headline left-m">
          <img className="headline-logo" src={headlinelogo} alt="headline-logo" />
          <span>Lorem ipsum dolor</span>
        </span>
        <span className="headline">
          <img className="headline-logo" src={headlinelogo} alt="headline-logo" />
          <span>Lorem Ipsum Dolor </span>
        </span>
        <span className="headline right-m">
          <img className="headline-logo" src={headlinelogo} alt="headline-logo" />
          <span>Lorem Ipsum Dolor</span>
        </span>
      </section>

      <section className="bottom-nav">
        <div className="bottom-nav-utility">
          <span className="logo">
            <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
            <img src={logo} alt="logo" />
          </span>
          <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
            <div className="sidebar-header">
              <span>LOGO</span>
              <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />
            </div>
            <div className="sidebar-links">
              <div>Sign Up</div>
              <div>Sign In</div>
              <div>About</div>
              <div>Skills</div>
              <div>Stories</div>
              <div>Contact Us</div>
            </div>
          </aside>

          <div className="nav-utilities">
            <CiSearch  size="26px" className="img search"/>
            <Link to='/fav-list'>
            <Badge  badgeContent={cart?.length} color="secondary">
              <CiHeart size='26px' className="img like"/>
            </Badge>
            </Link>
            
            <PiHandbagSimpleLight size="26px" className="img bag"/>
            <CiUser  size="26px"className="img profile"/>
            <select name="languages" id="languages" className="lang">
              <option value="ENG">ENG</option>
              <option value="ESP">ESP</option>
              <option value="FRA">FRA</option>
            </select>
          </div>
        </div>
        <span className="website-name">LOGO</span>

        <div className="nav-links">
  <ul>
    <li><Link to="/">SHOP</Link></li>
    <li><Link to="/">SKILLS</Link></li>
    <li><Link to="/">STORIES</Link></li>
    <li><Link to="/">ABOUT</Link></li>
    <li><Link to="/">CONTACT US</Link></li>
  </ul>
</div>
      </section>
    </nav>
  );
};

export default Navbar;
