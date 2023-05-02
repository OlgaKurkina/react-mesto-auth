import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "./auth.js";

const Register = ({ registerUser }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // registerUser(formValue);

    const { email, password } = formValue;
    auth.register(email, password);
  };

  return (
    <div className="register">
      <h2 className="register__welcome welcome">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          type="email"
          name="register-email"
          id="register-email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
        />

        <input
          className="register__input"
          type="password"
          name="register-password"
          id="register-password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <button
          className="register__button"
          type="submit"
          name="submit-button"
          id="submit-button"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>
          Уже зарегистрированы?
          <Link to="/login" className="register__login-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;