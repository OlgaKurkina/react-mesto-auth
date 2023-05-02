import logo from "../images/Logo_vector.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto" />
      <p>
        <Link to="/register" className="header__login-link">
          Регистрация
        </Link>
      </p>
    </header>
  );
}

export default Header;
