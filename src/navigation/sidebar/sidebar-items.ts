import {
  Banknote,
  BarChart3,
  ClipboardCheck,
  ClipboardList,
  FileText,
  Folder,
  HelpCircle,
  Home,
  Image,
  Layers,
  LayoutDashboard,
  LogOut,
  type LucideIcon,
  MessageSquare,
  Package,
  PackageCheck,
  Scissors,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
  badge?: number | string;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "CTA Operations",
    items: [
      {
        title: "Home",
        url: "/dashboard/default",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/dashboard/merchant",
        icon: LayoutDashboard,
        badge: "2926",
      },
      {
        title: "CTA Mill",
        url: "/dashboard/production",
        icon: Store,
        subItems: [
          {
            title: "Bulk Processing",
            url: "/dashboard/production",
            icon: PackageCheck,
          },
        ],
      },
      {
        title: "Procurement & Dispatch",
        url: "/documents/material-requisition",
        icon: ShoppingCart,
        subItems: [
          {
            title: "VG::Dispatch Challan",
            url: "/documents/dispatch-challan",
            icon: FileText,
          },
          {
            title: "VG::Material Requisition",
            url: "/documents/material-requisition",
            icon: ShoppingCart,
          },
        ],
      },
      {
        title: "Approvals",
        url: "/documents/fabric-working",
        icon: ClipboardCheck,
        subItems: [
          {
            title: "Initial Costing",
            url: "/dashboard/costing",
            icon: Banknote,
          },
          {
            title: "Fabric Working",
            url: "/documents/fabric-working",
            icon: Scissors,
          },
        ],
      },
      {
        title: "Order Management",
        url: "/dashboard/orders",
        icon: BarChart3,
        subItems: [
          {
            title: "Smart Document Extractor",
            url: "/dashboard/orders",
            icon: FileText,
          },
          {
            title: "Orders and TNA Tracker",
            url: "/dashboard/tna-tracker",
            icon: ClipboardList,
          },
        ],
      },
      {
        title: "Sample Tracking",
        url: "/dashboard/sample-tracking",
        icon: Package,
        subItems: [
          {
            title: "Sample Create",
            url: "/dashboard/sample-create",
            icon: FileText,
          },
          {
            title: "Sample Assign",
            url: "/dashboard/sample-assign",
            icon: Users,
          },
          {
            title: "Sampling Status",
            url: "/dashboard/sampling-status",
            icon: ClipboardCheck,
          },
          {
            title: "Sample Tracking",
            url: "/dashboard/sample-tracking",
            icon: Package,
          },
        ],
      },
      {
        title: "Style Development",
        url: "/dashboard/style-repository",
        icon: Layers,
        subItems: [
          {
            title: "My Styles",
            url: "/dashboard/style-repository",
            icon: Folder,
          },
          {
            title: "Style Databank",
            url: "/dashboard/style-databank",
            icon: Layers,
          },
        ],
      },
      {
        title: "Design Vault",
        url: "/design/gallery",
        icon: Image,
      },
      {
        title: "Fabric and Trim Inventory",
        url: "/dashboard/inventory",
        icon: Package,
      },
      {
        title: "Supplier Performance",
        url: "/dashboard/suppliers",
        icon: BarChart3,
      },
      {
        title: "Notification",
        url: "/notification",
        icon: MessageSquare,
        badge: "2926",
      },
    ],
  },
  {
    id: 2,
    label: "Others",
    items: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "Accounts",
        url: "/dashboard/accounts",
        icon: Users,
      },
      {
        title: "Help",
        url: "/dashboard/help",
        icon: HelpCircle,
      },
      {
        title: "Sign Out",
        url: "/",
        icon: LogOut,
      },
    ],
  },
];
