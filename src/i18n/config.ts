import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: {
        "title": "Login Page",
        "description": "Login to your account",
        "button": "Login",
      },
      product: {
        title: 'Product',
      },
      folder: {
        title: "Folder Structure",
      },
      home: {
        title: "Welcome",
        description: "This is the home page",
      },
      project: {
        title: 'Project',
        description: "happy to learn new things",
      },
      about: {
        title: "About Us",
        description: "Learn more about our company",
      },
      navigation: {
        home: "Home",
        product: 'Product',
        project: "Project",
        about: "About",
        contact: "Contact",
        ui: "UI",
        dashboard: "Dashboard",
        invoices: "Invoices",
      },
    },
  },
  it: {
    translation: {
      login: {
        "title": "Login Page",
      },
      product: {
        title: 'Product',
      },
      folder: {
        title: "Cartella",
      },
      home: {
        title: "Benvenuto",
        description: "Questa è la home page",
      },
      project: {
        title: 'Progetto',
        description: "felice di imparare cose nuove",
      },
      about: {
        title: "Chi Siamo",
        description: "Scopri di più sulla nostra azienda",
      },
      navigation: {
        home: "Casa",
        project: "Progetto",
        about: "Chi Siamo",
        contact: "Contatti",
        ui: 'UI',
        dashboard: "Dashboard",
        invoices: "Invoices",
      },
    },
  },
  km: {
    translation: {
      login: {
        "title": "ទំព័រចូល",
        "description": "ចូលទៅកាន់គណនីរបស់អ្នក",
        "button": "ចូល",
      },
      product: {
        title: 'ផលិតផល',
      },
      folder: {
        title: "រចនាសម្ព័ន្ធថត",
      },
      home: {
        title: "សូមស្វាគមន៍",
        description: "នេះជាទំព័រដើម",
      },
      project: {
        title: 'គម្រោង',
        description: "រីករាយក្នុងការរៀនអ្វីថ្មី។",
      },
      about: {
        title: "អំពីយើង",
        description: "ស្វែងយល់បន្ថែមអំពីក្រុមហ៊ុនរបស់យើង។",
      },
      navigation: {
        home: "ផ្ទះ",
        product: 'ផលិតផល',
        project: "គម្រោង",
        about: "អំពី",
        contact: "ទំនាក់ទំនង",
        ui: "រូបរាង",
        dashboard: "ផ្ទាំងគ្រប់គ្រង",
        invoices: "វិក្កយបត្រ",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
