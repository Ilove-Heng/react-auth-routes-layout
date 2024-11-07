import { createRootRouteWithContext, Outlet, redirect, useLocation, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthContextType } from '../context/auth-context.type'
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../types/i18n/i18n'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface MyRouterContext {
    auth: AuthContextType
  }

  export const Route = createRootRouteWithContext<MyRouterContext>()({
    notFoundComponent: () => <div>Not found page</div>,
    component: RootComponent,

    beforeLoad: async ({ location }) => {
      if (location.pathname === '/') {
        const savedLang = localStorage.getItem("language");
        const browserLang = navigator.language.split("-")[0];
        const defaultLang = SUPPORTED_LANGUAGES.includes(
          savedLang as SupportedLanguage
        )
          ? String(savedLang)
          : SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)
            ? browserLang
            : "en"; // Fallback to 'en' if no valid language is found

        // Store the default language in local storage
        localStorage.setItem("language", defaultLang);

        throw redirect({
          to: "/$lang",
          params: { lang: defaultLang },
        });
      }
    }
  })

function RootComponent() {
  // render the root component only when authenticated

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract language from URL path
  const getCurrentLanguageFromPath = () => {
    const pathSegments = location.pathname.split("/");
    return pathSegments[1] || "en"; // Default to 'en' if no language segment
  };

  useEffect(() => {
    const urlLang = getCurrentLanguageFromPath();
    // Validate if the URL language is supported
    if (SUPPORTED_LANGUAGES.includes(urlLang as SupportedLanguage)) {
      // Update i18n language
      i18n.changeLanguage(urlLang);
      // Update localStorage
      localStorage.setItem("language", urlLang);
      // Update HTML lang attribute
      document.documentElement.lang = urlLang;
    } else {
      // If URL has unsupported language, redirect to English
      const currentPath = location.pathname.split("/").slice(2).join("/");
      navigate({
        to: `/en/${currentPath}`,
      });
    }

    // Retrieve the language from local storage on component mount
    const savedLang = localStorage.getItem("language");
    if (
      savedLang &&
      SUPPORTED_LANGUAGES.includes(savedLang as SupportedLanguage)
    ) {
      i18n.changeLanguage(savedLang);
    }
  }, [location.pathname, i18n, navigate]);


  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  )
}