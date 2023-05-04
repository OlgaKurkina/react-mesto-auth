import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "./auth.js";

const Login = ({ onLogin }) => {
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
    onLogin(formValue.email, formValue.password);
  };

  return (
    <div className="login">
      <h2 className="login__welcome welcome">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          name="email"
          id="login-email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          className="login__input"
          type="password"
          name="password"
          id="login-password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button
          className="login__button"
          type="submit"
          name="submit-btn"
          id="submit-btn"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
