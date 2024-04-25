import { useTranslation } from "react-i18next";

const FooterComp = () => {
  const { t } = useTranslation();

  const socialMediaLinks = [
    {
      icon: "fas fa-globe",
      link: "https://suhaib.dev/",
      tooltip: t("Own Website"),
      key: "website",
    },
    {
      icon: "fab fa-linkedin",
      link: "https://linkedin.com/in/makkahwi/",
      tooltip: t("Makkahwi @ Linkedin"),
      key: "linkedin",
    },
    {
      icon: "fab fa-facebook",
      link: "https://facebook.com/makkahwi",
      tooltip: t("Makkahwi @ Facebook"),
      key: "facebook",
    },
    {
      icon: "fab fa-instagram",
      link: "https://instagram.com/makkahwi",
      tooltip: t("Makkahwi @ Instagram"),
      key: "instagram",
    },
    {
      icon: "fab fa-whatsapp",
      link: "https://wasap.my/962788424973",
      tooltip: t("+962788424973 @ Whatsapp"),
      key: "whatsapp",
    },
    {
      icon: "fab fa-telegram",
      link: "https://t.me/makkahwi",
      tooltip: t("+962788424973 @ Telegram"),
      key: "telegram",
    },
    {
      icon: "fas fa-envelope",
      link: "mailto:SuhaibAhmadAi@hotmail.com",
      tooltip: t("Professional Email"),
      key: "email",
    },
    {
      icon: "fas fa-phone",
      link: "tel:+962788424973",
      tooltip: t("+962788424973"),
      key: "phone",
    },
  ];

  return (
    <footer className="text-center text-lg-start bg-transparent text-muted">
      <section className="container d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <h5 className="text-primary">{t("Developer Contacts")}</h5>

        <div>
          {socialMediaLinks.map(({ icon, link, tooltip, key }, i) => (
            <a
              href={link}
              target="_blank"
              className="mx-2 text-primary"
              key={i}
            >
              <i className={icon} />
            </a>
          ))}
        </div>
      </section>

      <div className="text-center p-4">
        {t("Multi-Game Assistant")} © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default FooterComp;
