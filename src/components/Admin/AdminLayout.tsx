import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageMeta } from '@/components/SEO/PageMeta';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  return (
    <>
      <PageMeta title={title} description={description} />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Admin Header */}
        <div className="pt-24 pb-8 border-b border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
          <div className="container mx-auto px-6">
            <Breadcrumbs />
            <div className="mt-6">
              <h1 className="text-4xl md:text-5xl font-orbitron font-black mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </div>

      <Footer />
    </>
  );
};
