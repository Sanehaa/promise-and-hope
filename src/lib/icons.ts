import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Award,
  BookOpen,
  Church,
  HandHeart,
  Heart,
  HeartPulse,
  Home,
  Package,
  Shield,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Apple,
  Award,
  BookOpen,
  Church,
  HandHeart,
  Heart,
  HeartPulse,
  Home,
  Package,
  Shield,
  ShieldAlert,
  Sparkles,
  Users,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Heart;
}
