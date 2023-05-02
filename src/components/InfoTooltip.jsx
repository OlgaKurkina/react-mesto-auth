import React from "react";
import usePopupClose from "../hooks/usePopupClose";
import RegConfirmImg from "../images/Union.svg";
import RegRejectImg from "../images/Union reject.svg";

function InfoTooltip({ name, isOpen, title, onClose }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          className="infotooltip__confirm"
          src={RegConfirmImg}
          alt="Статус регистрации пользователя"
        />
        <h2 className={`popup__container-name popup__${name}`}>{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
