import {
  Boxes,
  Brain,
  Cable,
  CircuitBoard,
  Cloud,
  Cpu,
  Database,
  Download,
  FileText,
  Globe,
  HardDrive,
  Mail,
  MailCheck,
  Map,
  MessageCircle,
  MessagesSquare,
  MonitorCog,
  Network,
  Printer,
  Router,
  Server,
  Sheet,
  Shield,
  ShieldCheck,
  Smartphone,
  SquareTerminal,
  Terminal,
  Users,
  Wifi
} from "lucide-react";

const iconMap = {
  Boxes,
  Brain,
  Cable,
  Chrome: Globe,
  CircuitBoard,
  Cloud,
  Cpu,
  Database,
  Download,
  FileText,
  Globe,
  HardDrive,
  Mail,
  MailCheck,
  Map,
  MessageCircle,
  MessagesSquare,
  MonitorCog,
  Network,
  Printer,
  Router,
  Server,
  Sheet,
  Shield,
  ShieldCheck,
  Smartphone,
  SquareTerminal,
  Terminal,
  Users,
  Wifi
};

type CategoryIconProps = {
  name: string;
  className?: string;
};

export function CategoryIcon({
  name,
  className = "h-5 w-5"
}: CategoryIconProps) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? FileText;

  return <Icon aria-hidden="true" className={className} />;
}
