import Icons from "../assets/images/icons";

function NotFound() {
  return (
    <div className="about">
      <div className="about__container">
        <Icons.undrawNotFound className="about__undrawParking" />
        <div className="about__text">頁面可能被外星人抓走了，</div>
        <div className="about__text">試試看重新輸入網址。</div>
      </div>
    </div>
  );
}

export default NotFound;
