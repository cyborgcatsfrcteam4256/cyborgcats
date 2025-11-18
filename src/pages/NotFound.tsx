import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { PageMeta } from "@/components/SEO/PageMeta";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <PageMeta
        title={t('notFound.title')}
        description={t('notFound.description')}
        keywords="404, page not found, Cyborg Cats, FRC 4256"
      />
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="mb-4 text-6xl font-orbitron font-bold text-primary">404</h1>
          <p className="mb-8 text-2xl text-foreground">{t('notFound.message')}</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-orbitron">
            {t('notFound.returnHome')}
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
