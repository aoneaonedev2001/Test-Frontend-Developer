import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="containerHome">
      <Link to={"/test1"}>
        <div>
          <p className="items">{t("home.contentSet1.content1")}</p>
          <p className="items">{t("home.contentSet1.content2")}</p>
        </div>
      </Link>
      <Link to={"/test2"}>
        <div>
          <p className="items">{t("home.contentSet2.content1")}</p>
          <p className="items">{t("home.contentSet2.content2")}</p>
        </div>
      </Link>
    </div>
  );
};

export default Home;
