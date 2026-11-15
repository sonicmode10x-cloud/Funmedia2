import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { CTABanner } from '../components/CTABanner';
import { BLOG_CATEGORIES, BLOG_POSTS, type BlogCategory } from '../data/blog';
import { buildBreadcrumbSchema } from '../utils/seo';

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <SEOHead
        title="Marketing Insights & SEO Guides for Nepal | Funmedia Blog"
        description="Practical guides on digital marketing, social media, influencer collaborations, commercial video production, ads, and branding for businesses in Nepal."
        keywords="Digital Marketing Blog Nepal, Social Media Marketing Guide Nepal, Video Production Cost Nepal, Influencer Marketing Nepal"
        canonicalPath="/blog"
        schema={buildBreadcrumbSchema(breadcrumbs)}
      />

      <section className="bg-[#090909] pt-28 pb-14 text-white sm:pt-32 lg:pt-36 lg:pb-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
            FUNMEDIA JOURNAL · NEPAL MARKETING RESOURCES
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
            Marketing Guides Built for Brands in Nepal.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Actionable articles covering strategy, Meta &amp; Google advertising, Reels production, influencer partnerships, branding, and growth in Pokhara and Kathmandu.
          </p>

          <div
            role="group"
            aria-label="Filter articles by category"
            className="mt-8 flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`min-h-[40px] rounded-full px-5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#FF4F17] text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              All Articles ({BLOG_POSTS.length})
            </button>
            {BLOG_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] rounded-full px-5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#FF4F17] text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={Math.min(index * 0.04, 0.2)}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col justify-between rounded-[24px] bg-[#F3F4F6] p-6 ring-1 ring-black/8 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#090909] px-3 py-1 text-[11px] font-bold text-white">
                      <BookOpen className="h-3 w-3 text-[#FF4F17]" aria-hidden="true" />
                      <span>{post.category}</span>
                    </span>
                    <span className="font-mono text-xs text-[#52525B]">{post.readTime}</span>
                  </div>

                  <h2 className="font-display mt-5 text-xl leading-snug font-extrabold tracking-tight text-[#090909] group-hover:text-[#FF4F17]">
                    {post.title}
                  </h2>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-bold text-[#090909]">
                  <span>Read Article</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-black/10 transition-colors group-hover:bg-[#FF4F17] group-hover:text-white group-hover:ring-[#FF4F17]">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
