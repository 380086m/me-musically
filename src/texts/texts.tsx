import texts from "./texts.json";
import { Languages, Texts } from "./types";

export const getText = (key: keyof Texts): string => {
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;

  const locale = userLocale.split("-")[0] as keyof Languages;
  return texts[key][locale];
};
