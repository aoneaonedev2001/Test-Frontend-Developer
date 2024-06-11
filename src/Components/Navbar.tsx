import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface LanguageOption {
  value: string;
  label: string;
}

const Navbar = () => {
  const location = useLocation();
  //console.log(location.pathname);

  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
    value: "en",
    label: "EN",
  });

  const changeLanguage = (lng: LanguageOption) => {
    const newLanguage =
      lng.value === "en"
        ? { value: "en", label: "EN" }
        : { value: "th", label: "ไทย" };
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(lng.value);
  };

  const options =
    selectedLanguage.value === "en"
      ? [
          { value: "en", label: "EN" },
          { value: "th", label: "TH" },
        ]
      : [
          { value: "en", label: "อังกฤษ" },
          { value: "th", label: "ไทย" },
        ];

  return (
    <div className="containerNav">
      <Select
        labelInValue
        value={selectedLanguage}
        style={{ width: 120 }}
        onChange={changeLanguage}
        options={options}
      />
      {location.pathname === "/test2" && (
        <Button className="ss" onClick={() => navigate("/")}>
          {t("home.contentSet1.content3")}
        </Button>
      )}
    </div>
  );
};

export default Navbar;
