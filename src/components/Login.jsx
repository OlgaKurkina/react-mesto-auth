import React, { useState } from "react";
//import { Link } from "react-router-dom";
//import * as auth from "./auth.js";

const Login = ({ loginUser }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(formValue);
  };
  return (
    <div className="login">
      <h2 className="login__welcome welcome">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          name="login-email"
          id="login-email"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
          required
        />
        <input
          className="login__input"
          type="password"
          name="login-password"
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
