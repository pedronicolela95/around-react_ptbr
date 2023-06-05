import headerImageImg from "../images/header/__image.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__image"
        alt="Around USA logo"
        src={headerImageImg}
      />
    </header>
  );
}

export default Header;
