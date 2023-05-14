import React from "react";
import editButtonImg from "../images/profile/edit_button.svg";
import plusSignImg from "../images/profile/plus-sign.svg";
import editImageButton from "../images/profile/edit-picture.svg";

import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import api from "./Api";

function Main(props) {
  const {
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    closeAllPopups,
    isImagePopupOpen,
    handleCardClick,
    selectedCard,
  } = props;

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
        setUserId(res._id);

        return api.getInitialCards().then((res) => {
          setCards(res);
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__image" onClick={handleEditAvatarClick}>
          <div className="profile__picture-overlay"></div>
          <img
            className="profile__edit-picture"
            alt="Logo"
            src={editImageButton}
          />
          <img
            className="profile__picture"
            alt="User profile"
            src={userAvatar}
          />
        </div>
        <div className="profile__info">
          <h3 className="profile__name">{userName}</h3>
          <h5 className="profile__about-me">{userDescription}</h5>
          <button onClick={handleEditProfileClick}>
            <img
              className="profile__edit-button"
              alt="Edit Button logo"
              src={editButtonImg}
            />
          </button>
        </div>
        <button className="profile__add-button" onClick={handleAddPlaceClick}>
          <img
            className="profile__plus-sign"
            alt="Add Button logo"
            src={plusSignImg}
          />
        </button>
      </section>
      <ul className="posts">
        {cards.map((item) => (
          <Card
            key={item._id}
            name={item.name}
            link={item.link}
            isOwned={item.owner._id === userId}
            likeNumber={item.likes.length}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>

      <PopupWithForm
        name="profile-form"
        title="Editar Perfil"
        isOpen={isEditProfilePopupOpen}
        closeFunction={closeAllPopups}
      >
        <input
          className="popup__input"
          id="name-input"
          placeholder="Nome"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error name-input-error"></span>
        <input
          className="popup__input"
          id="about-me-input"
          placeholder="Sobre mim"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error about-me-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="profile-image"
        title="Alterar a foto do perfil"
        isOpen={isEditAvatarPopupOpen}
        closeFunction={closeAllPopups}
      >
        <input
          className="popup__input"
          id="image-input"
          placeholder="Link da imagem"
          type="url"
          required
        />
        <span className="popup__error image-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="place-form"
        title="Novo local"
        isOpen={isAddPlacePopupOpen}
        closeFunction={closeAllPopups}
      >
        <input
          className="popup__input"
          id="title-input"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__error title-input-error"></span>
        <input
          className="popup__input"
          type="url"
          id="image-link-input"
          placeholder="Link da imagem"
          required
        />
        <span className="popup__error image-link-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="delete-form"
        title="Tem certeza?"
        closeFunction={closeAllPopups}
      ></PopupWithForm>
      <ImagePopup
        name="image-zoom"
        isOpen={isImagePopupOpen}
        closeFunction={closeAllPopups}
        selectedCard={selectedCard}
      ></ImagePopup>
    </>
  );
}

export default Main;
