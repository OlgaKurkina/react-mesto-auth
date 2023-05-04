import React from "react";
import usePopupClose from "../hooks/usePopupClose";
import RegConfirmImg from "../images/Union.svg";
import RegRejectImg from "../images/Union reject.svg";

function InfoTooltip({ isOpen, onClose, isConfirm }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`infotooltip popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          className="infotooltip__img"
          src={`${isConfirm ? RegConfirmImg : RegRejectImg}`}
          alt="Статус регистрации пользователя"
        />
        <h2 className="infotooltip__title">{`${
          isConfirm
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."
        }`}</h2>
        <button className="close-icon" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
