import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found | Funmedia"
        description="The page you requested could not be found. Return to Funmedia — Full-Service Creative and Digital Marketing Agency in Nepal."
        noindex
      />

      <section className="flex min-h-[75vh] items-center bg-[#090909] pt-28 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-sm font-bold text-[#FF4F17]">404</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-white uppercase sm:text-6xl">
            This Page Is Off the Set.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
            The URL you visited does not exist or may have moved. Head back to the main showcase, explore our services, or browse our marketing guides.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#FF4F17] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#e54310]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex min-h-[46px] items-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white hover:text-[#090909]"
            >
              View Services
            </Link>
            <Link
              to="/work"
              className="inline-flex min-h-[46px] items-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white hover:text-[#090909]"
            >
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
