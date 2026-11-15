import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { CTABanner } from '../components/CTABanner';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blog';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/site';
import { buildBreadcrumbSchema, getCanonicalUrl } from '../utils/seo';
import { NotFoundPage } from './NotFoundPage';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFoundPage />;
  }

  const relatedServices = SERVICES.filter((s) => post.relatedServiceSlugs.includes(s.slug));
  const morePosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: post.title, path: `/blog/${post.slug}` },
  ];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.websiteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.websiteUrl,
    },
    mainEntityOfPage: getCanonicalUrl(`/blog/${post.slug}`),
  };

  return (
    <>
      <SEOHead
        title={post.seoTitle}
        description={post.seoDescription}
        keywords={post.primaryKeyword}
        canonicalPath={`/blog/${post.slug}`}
        type="article"
        schema={[blogSchema, buildBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="bg-[#090909] pt-28 pb-14 text-white sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white/70 uppercase transition-colors hover:text-[#FF4F17]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to All Articles</span>
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-[#FF4F17] px-3.5 py-1 font-bold text-white uppercase">
              {post.category}
            </span>
            <span className="font-mono text-white/70">{post.readTime}</span>
            <span className="font-mono text-white/55">Published {post.publishedAt}</span>
          </div>

          <h1 className="font-display mt-4 text-3xl leading-[1.06] font-extrabold tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
            {post.excerpt}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-10">
          {post.sections.map((sec) => (
            <Reveal key={sec.heading}>
              <section>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] sm:text-3xl">
                  {sec.heading}
                </h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-[#52525B]">
                  {sec.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="mt-5 space-y-2.5 rounded-2xl bg-[#F3F4F6] p-6 ring-1 ring-black/8">
                    {sec.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm font-medium text-[#090909]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4F17]" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        {/* Related Service Internal Links */}
        {relatedServices.length > 0 && (
          <Reveal>
            <div className="mt-14 rounded-[26px] bg-[#090909] p-7 text-white sm:p-9">
              <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                RELATED SERVICES AT FUNMEDIA
              </span>
              <h2 className="font-display mt-2 text-2xl font-extrabold text-white">
                Put These Insights Into Practice
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {relatedServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/${svc.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-[#FF4F17]"
                  >
                    <div className="font-display text-sm font-bold text-white group-hover:text-[#FF4F17]">
                      {svc.title}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/75">
                      <span>Explore</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>

              {post.relatedLocationSlugs && post.relatedLocationSlugs.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-white/70">
                    <MapPin className="h-3.5 w-3.5 text-[#FF4F17]" aria-hidden="true" />
                    Local Teams:
                  </span>
                  {post.relatedLocationSlugs.map((locSlug) => (
                    <Link
                      key={locSlug}
                      to={`/${locSlug}`}
                      className="rounded-full bg-white/10 px-3.5 py-1.5 font-bold text-white hover:bg-[#FF4F17]"
                    >
                      {locSlug.includes('pokhara') ? 'Pokhara Agency' : 'Kathmandu Agency'}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* Further Reading */}
        <div className="mt-14 border-t border-black/10 pt-10">
          <Reveal>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-[#090909] uppercase">
              More Marketing Guides
            </h2>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {morePosts.map((other, idx) => (
              <Reveal key={other.slug} delay={Math.min(idx * 0.06, 0.18)}>
                <Link
                  to={`/blog/${other.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl bg-[#F3F4F6] p-5 ring-1 ring-black/8 transition-colors hover:bg-[#090909] hover:text-white"
                >
                  <span className="font-mono text-[11px] font-bold text-[#FF4F17]">
                    {other.category}
                  </span>
                  <h3 className="font-display mt-2 text-sm font-bold text-[#090909] group-hover:text-white">
                    {other.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </article>

      <CTABanner
        headline="Request a Proposal"
        subtext="Want Funmedia to plan and execute these strategies for your brand in Nepal? Send us a brief."
      />
    </>
  );
}
