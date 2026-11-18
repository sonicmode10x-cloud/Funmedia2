import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { LogoIntro } from './components/LogoIntro';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { SERVICES } from './data/services';

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
);
const LocationPage = lazy(() => import('./pages/LocationPage').then((m) => ({ default: m.LocationPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })));
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
);
const IndustriesPage = lazy(() =>
  import('./pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })),
);
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LogoIntro />
      <div className="flex min-h-screen flex-col bg-white text-[#090909]">
        <Navbar />
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="min-h-[60vh] bg-white pt-28 text-center text-xs font-semibold text-[#52525B]">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />

              {SERVICES.map((svc) => (
                <Route
                  key={svc.slug}
                  path={`/${svc.slug}`}
                  element={<ServiceDetailPage forcedSlug={svc.slug} />}
                />
              ))}

              <Route
                path="/digital-marketing-agency-pokhara"
                element={<LocationPage cityKey="pokhara" />}
              />
              <Route
                path="/digital-marketing-agency-kathmandu"
                element={<LocationPage cityKey="kathmandu" />}
              />

              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<ProjectDetailPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
