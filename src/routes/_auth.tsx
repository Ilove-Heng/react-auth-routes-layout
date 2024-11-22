import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { useAuth } from '../context/auth-context';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const Route = createFileRoute('/_auth')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/$lang/login',
        params: { lang: 'en' },
        search: {
          redirect: location.pathname,
        }
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  const { t, i18n } = useTranslation();
  const router = useRouter()
  const navigate = Route.useNavigate();
  const auth = useAuth();
  const search = Route.useSearch()

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {

      await auth.logout();
      await router.invalidate();

      // Redirect to login page
      await navigate({
        to: search.redirect || '/$lang/login',
        params: { lang: 'en' }
      });
    }
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "km" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    document.documentElement.lang = newLang;
    const currentPath = location.pathname.split("/").slice(2).join("/");

    navigate({
      to: `/${newLang}/${currentPath}`,
    });
  };

  const validateLanguage = (lang: string) => {
    const supportedLanguages = ["en", "km"];
    return supportedLanguages.includes(lang) ? lang : "en";
  };

  const getCurrentLanguageFromPath = () => {
    const pathSegments = location.pathname.split("/");
    return pathSegments[1] || "en";
  };

  const currentLang = validateLanguage(getCurrentLanguageFromPath());

  return (
    <div style={{
      padding: 4,
      height: '100%',
    }}>
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul style={{ padding: '0 1rem 0 1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', listStyle: 'none' }}>
        <li>
          <Link 
            to={`/${currentLang}/dashboard`}
            params={{ lang: currentLang }}
            activeOptions={{ exact: true }}
            activeProps={{
              style: { color: 'green' },
            }}
            inactiveProps={{
              style: { color: 'white' },
            }}
          >
            {t('navigation.dashboard')}
          </Link>
        </li>

        <li>
          <Link 
            to={`/${currentLang}/invoices`}
            params={{ lang: currentLang }}
            activeProps={{
              style: { color: 'green' },
            }}
            inactiveProps={{
              style: { color: 'white' },
            }}
          >
            {t('navigation.invoices')}
          </Link>
        </li>

        <li>
          <button type='button' onClick={toggleLanguage}>Language</button>
        </li>

        <li>
          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>

      <hr />

      <Outlet />
    </div>
  );
}

