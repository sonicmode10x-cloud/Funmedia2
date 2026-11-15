import {
  Building2,
  Clapperboard,
  Compass,
  Disc3,
  Layers,
  Megaphone,
  Mountain,
  Music,
  Palette,
  Share2,
  ShoppingBag,
  Sparkles,
  Ticket,
  Users,
  Utensils,
} from 'lucide-react';
import type { ServiceIconKey } from '../data/services';
import type { ProjectIconKey } from '../data/projects';
import type { IndustryIconKey } from '../data/industries';

type AnyIconKey = ServiceIconKey | ProjectIconKey | IndustryIconKey;

const ICON_MAP = {
  compass: Compass,
  share: Share2,
  clapperboard: Clapperboard,
  sparkles: Sparkles,
  users: Users,
  palette: Palette,
  megaphone: Megaphone,
  layers: Layers,
  music: Music,
  utensils: Utensils,
  mountain: Mountain,
  disc: Disc3,
  building: Building2,
  ticket: Ticket,
  shoppingBag: ShoppingBag,
} as const;

interface CategoryIconProps {
  name: AnyIconKey;
  className?: string;
}

export function CategoryIcon({ name, className = 'h-5 w-5' }: CategoryIconProps) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
