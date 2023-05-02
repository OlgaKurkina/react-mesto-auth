class Api {
  constructor({ basePath, headers }) {
    this._basePath = basePath;
    this._headers = headers;
  }

  _getRequest(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  //получение ответа от сервера
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getCards() {
    return this._getRequest(`${this._basePath}/cards`, {
      headers: this._headers,
    });
  }

  addNewCard(data) {
    return this._getRequest(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  getUserData() {
    return this._getRequest(`${this._basePath}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  updateUserData(data) {
    return this._getRequest(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  //обновление аватара
  updateUserAvatar(avatar) {
    return this._getRequest(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }

  //удаление карточки
  deleteMyCard(id) {
    return this._getRequest(`${this._basePath}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeStatus(id, isLiked) {
    return this._getRequest(`${this._basePath}/cards/${id}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
      //body: JSON.stringify(card),
    });
  }
}

export const api = new Api({
  basePath: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "9fcb3909-3689-4058-8869-85eda4cfd0db",
    "Content-Type": "application/json",
  },
});

//export default Api;
