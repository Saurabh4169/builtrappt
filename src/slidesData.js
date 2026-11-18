import rawSlides from './slidesContent.json';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  Clock,
  Wallet,
  TrendingUp,
  Scale,
  ShieldAlert,
  Plane,
  FileText,
  CheckSquare,
  UserCheck,
  BarChart3,
  CalendarCheck,
  History,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  FileClock,
  Briefcase,
  UserPlus,
  Building2,
  HelpCircle,
  Coins,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';

const ICON_MAP = {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  Clock,
  Wallet,
  TrendingUp,
  Scale,
  ShieldAlert,
  Plane,
  FileText,
  CheckSquare,
  UserCheck,
  BarChart3,
  CalendarCheck,
  History,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  FileClock,
  Briefcase,
  UserPlus,
  Building2,
  HelpCircle,
  Coins,
  ShieldCheck,
  Calendar,
  Sparkles,
};

export const SLIDES_DATA = rawSlides.map((slide) => {
  const item = { ...slide };

  if (item.moduleLeft && typeof item.moduleLeft.icon === 'string') {
    item.moduleLeft = {
      ...item.moduleLeft,
      icon: ICON_MAP[item.moduleLeft.icon] || FileText,
    };
  }

  if (item.moduleRight && typeof item.moduleRight.icon === 'string') {
    item.moduleRight = {
      ...item.moduleRight,
      icon: ICON_MAP[item.moduleRight.icon] || FileText,
    };
  }

  if (item.categories && Array.isArray(item.categories)) {
    item.categories = item.categories.map((cat) => ({
      ...cat,
      icon: ICON_MAP[cat.icon] || Users,
    }));
  }

  return item;
});
