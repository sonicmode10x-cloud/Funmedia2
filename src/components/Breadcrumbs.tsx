import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbEntry } from '../utils/seo';

interface BreadcrumbsProps {
  items: BreadcrumbEntry[];
  variant?: 'dark' | 'light';
}

export function Breadcrumbs({ items, variant = 'dark' }: BreadcrumbsProps) {
  const isDark = variant === 'dark';

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 ${
                    isDark ? 'text-white/40' : 'text-zinc-400'
                  }`}
                  aria-hidden="true"
                />
              )}
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className={`transition-colors ${
                    isDark
                      ? 'text-white/70 hover:text-[#FF4F17]'
                      : 'text-[#52525B] hover:text-[#FF4F17]'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isDark ? 'font-semibold text-[#FF4F17]' : 'font-semibold text-[#090909]'}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
