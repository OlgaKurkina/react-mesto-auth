import logo from "../images/Logo_vector.svg";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

export default function Header({ email, onSingOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto" />
      <div className="header__routes">
        <Routes>
          <Route
            path="/login"
            element={
              <Link to="/register" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/register"
            element={
              <Link to="/login" className="header__link">
                Вход
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{email}</p>
                <button className="header__logOut" onClick={onSingOut}>
                  Выйти
                </button>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

//export default Header;
