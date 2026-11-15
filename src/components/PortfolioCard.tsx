import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { CategoryIcon } from './CategoryIcon';

interface PortfolioCardProps {
  project: ProjectItem;
  horizontal?: boolean;
}

export function PortfolioCard({ project, horizontal = false }: PortfolioCardProps) {
  if (horizontal) {
    return (
      <Link
        to={`/work/${project.slug}`}
        className="group grid items-stretch gap-5 overflow-hidden rounded-[22px] bg-[#F3F4F6] p-3.5 ring-1 ring-black/8 transition-all duration-200 hover:bg-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#FF4F17] sm:grid-cols-12 sm:p-4"
      >
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[16px] bg-[#090909] p-5 text-white sm:col-span-5 sm:min-h-[200px]">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform duration-200 group-hover:scale-105">
              <CategoryIcon name={project.iconKey} className="h-5 w-5 stroke-[2]" />
            </span>
            <span className="font-mono tabular-nums text-xs font-semibold text-white/55">
              {project.number}
            </span>
          </div>

          <div className="mt-8">
            <div className="text-[11px] font-semibold tracking-wider text-white uppercase">
              {project.category}
            </div>
            {project.isVideoShowcase && (
              <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#FF4F17]">
                <Play className="h-3 w-3 fill-[#FF4F17] text-[#FF4F17]" aria-hidden="true" />
                <span>Motion Concept</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between py-2 pr-2 sm:col-span-7">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#52525B]">
              <span>{project.industry}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#090909] ring-1 ring-black/10 transition-colors group-hover:bg-[#FF4F17] group-hover:text-white group-hover:ring-[#FF4F17]">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <h3 className="font-display mt-3 text-lg leading-snug font-bold tracking-tight text-[#090909] sm:text-xl">
              {project.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#52525B] sm:text-sm">
              {project.description}
            </p>
          </div>

          <div className="mt-4 border-t border-black/10 pt-3 text-xs font-medium text-[#090909]">
            {project.servicesProvided.slice(0, 2).join(' · ')}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-[22px] bg-[#F3F4F6] p-3 ring-1 ring-black/8 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#FF4F17]"
    >
      <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-[16px] bg-[#090909] p-6 text-white">
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform duration-200 group-hover:scale-105">
            <CategoryIcon name={project.iconKey} className="h-5 w-5 stroke-[2]" />
          </span>
          <span className="font-mono tabular-nums text-xs font-semibold text-white/55">
            {project.number}
          </span>
        </div>

        <div className="flex items-end justify-between gap-2">
          <span className="text-xs font-semibold tracking-wider text-white uppercase">
            {project.category}
          </span>
          {project.isVideoShowcase && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FF4F17]">
              <Play className="h-3 w-3 fill-[#FF4F17] text-[#FF4F17]" aria-hidden="true" />
              <span>Motion Reel</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between px-2 pt-4 pb-2">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#52525B]">
            <span>{project.industry}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#090909] ring-1 ring-black/10 transition-colors group-hover:bg-[#FF4F17] group-hover:text-white group-hover:ring-[#FF4F17]">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>

          <h3 className="font-display mt-2.5 text-xl font-bold tracking-tight text-[#090909]">
            {project.title}
          </h3>

          <p className="mt-1.5 text-xs text-[#52525B]">{project.clientName}</p>
        </div>

        <div className="mt-4 border-t border-black/10 pt-3 text-xs text-[#52525B]">
          {project.servicesProvided.slice(0, 2).join(' · ')}
        </div>
      </div>
    </Link>
  );
}
