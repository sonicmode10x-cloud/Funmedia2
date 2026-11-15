import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { ServiceItem } from '../data/services';
import { CategoryIcon } from './CategoryIcon';

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col justify-between overflow-hidden rounded-[22px] bg-[#F3F4F6] p-2.5 ring-1 ring-black/8 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#FF4F17]"
    >
      <div className="relative flex aspect-[4/3.8] w-full flex-col justify-between overflow-hidden rounded-[18px] bg-[#090909] p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform duration-200 group-hover:scale-105">
            <CategoryIcon name={service.iconKey} className="h-5 w-5 stroke-[2.1]" />
          </div>
          <span className="font-mono tabular-nums text-xs font-semibold text-white/55">
            {service.number}
          </span>
        </div>

        <div className="mt-6 space-y-2 border-t border-white/15 pt-4">
          <div className="text-[11px] font-semibold tracking-wider text-[#FF4F17] uppercase">
            Key Focus
          </div>
          <ul className="space-y-1 text-xs text-white/85">
            {service.deliverables.slice(0, 2).map((item) => (
              <li key={item} className="truncate">
                · {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between px-3 pt-4 pb-2.5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold tracking-tight text-[#090909] sm:text-lg">
            {service.title}
          </h3>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#090909] ring-1 ring-black/10 transition-colors group-hover:bg-[#FF4F17] group-hover:text-white group-hover:ring-[#FF4F17]">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#52525B]">
          {service.shortDescription}
        </p>
      </div>
    </Link>
  );
}
