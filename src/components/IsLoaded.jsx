import Icons from "../assets/images/icons";

function IsLoaded() {
  return (
    <div className="about">
      <div className="about__container">
        <Icons.undrawIsLoaded className="about__undrawParking" />
        <div className="about__text">給我一點時間載入...</div>
      </div>
    </div>
  );
}

export default IsLoaded
