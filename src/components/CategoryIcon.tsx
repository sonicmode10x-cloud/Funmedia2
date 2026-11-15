import {
  Building2,
  Camera,
  Clapperboard,
  Compass,
  Disc3,
  Globe,
  Layers,
  Megaphone,
  Mountain,
  Music,
  Palette,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Target,
  Ticket,
  Users,
  Utensils,
  Video,
} from 'lucide-react';

export type AnyIconKey =
  | 'compass'
  | 'share'
  | 'clapperboard'
  | 'sparkles'
  | 'users'
  | 'palette'
  | 'megaphone'
  | 'layers'
  | 'music'
  | 'utensils'
  | 'mountain'
  | 'disc'
  | 'building'
  | 'ticket'
  | 'shoppingBag'
  | 'globe'
  | 'video'
  | 'camera'
  | 'search'
  | 'target';

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
  globe: Globe,
  video: Video,
  camera: Camera,
  search: Search,
  target: Target,
} as const;

interface CategoryIconProps {
  name: AnyIconKey;
  className?: string;
}

export function CategoryIcon({ name, className = 'h-5 w-5' }: CategoryIconProps) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
