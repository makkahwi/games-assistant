import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const WhiteCard = ({ title, desc, bg, gameUrl, rulesUrl, comingSoon }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="card card-blog">
      <div style={{ height: "30vh", overflowY: "hidden" }}>
        <img className="img pattern rounded" src={bg} width="100%" />
      </div>

      <div className="card-body">
        <div className="card-title h5 mb-0">{title}</div>

        <div className="card-text mt-2 mb-4">{desc}</div>

        {comingSoon ? (
          <button className="btn btn-danger rounded-2" disabled>
            {t("Coming Soon")}
          </button>
        ) : (
          <div className="btn-group">
            <button
              className="btn btn-primary rounded-start"
              onClick={() => navigate(gameUrl)}
            >
              {t("Start Game")}
            </button>

            <button
              className="btn btn-light text-dark rounded-end"
              onClick={() => navigate(rulesUrl)}
            >
              {t("Game Rules")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhiteCard;
