export const SUPPORTED_LANGUAGES = ["en", "it", "km"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageMetadata {
  name: string;
  nativeName: string;
  flag: string;
  dateFormat: string;
}

export const LANGUAGE_METADATA: Record<SupportedLanguage, LanguageMetadata> = {
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    dateFormat: "MM/DD/YYYY",
  },
  it: {
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    dateFormat: "DD/MM/YYYY",
  },
  km: {
    name: "Khmer",
    nativeName: "ខ្មែរ",
    flag: "🇰🇭",
    dateFormat: "DD/MM/YYYY",
  },
};
