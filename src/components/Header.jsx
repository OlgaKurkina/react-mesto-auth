import logo from "../images/Logo_vector.svg";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto" />
      <div className="header__routes">
        <Routes>
          <Route
            path="/signin"
            element={
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/signup"
            element={
              <Link to="/signin" className="header__link">
                Вход
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{email}</p>
                <button className="header__logout" onClick={onSignOut}>
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
