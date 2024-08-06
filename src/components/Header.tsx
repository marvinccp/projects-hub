import "../styles/Header.css";
import logo from '../assets/logo2.png'
import { Link } from "wouter";

export const Header = () => {
  return (
    <section className="header-container">
      <div className="logo-header-container">
        <Link to="/home">
        <img className="logo-ph" src={logo} alt="logo-ph" />
        </Link>
      </div>
    </section>
  );
};
