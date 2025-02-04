
import { setDefaultLocale } from "react-datepicker";
import bg from "date-fns/locale/bg";
import en from "date-fns/locale/en-US";
const datepickerLocaleMap = { bg, en };

import moment from "moment";
import "moment/dist/locale/bg";
import { useEffect } from "react";

export const useLocales = (language) => {
  useEffect(() => {
    setDefaultLocale(datepickerLocaleMap[language]);
    moment.locale(language);
  }, [language]);
};
