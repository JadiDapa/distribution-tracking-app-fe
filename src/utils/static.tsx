import {
  Building,
  Bus,
  BusFront,
  Cable,
  Home,
  Package,
  RectangleEllipsis,
  UserRound,
  UsersRound,
  Warehouse,
  Wrench,
} from "lucide-react";

export const sidebarLink = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <Home strokeWidth={1.5} />,
  },
  {
    name: "Inventory",
    url: "/inventory",
    icon: <Package strokeWidth={1.5} />,
  },
  {
    name: "User",
    url: "#",
    icon: <UserRound strokeWidth={1.5} />,
    segments: [
      {
        name: "List",
        url: "/user/list",
      },
      {
        name: "Create",
        url: "/user/create",
      },
    ],
  },
  {
    name: "Material",
    url: "#",
    icon: <Cable strokeWidth={1.5} />,
    segments: [
      {
        name: "List",
        url: "/material/list",
      },
      {
        name: "Create",
        url: "/material/create",
      },
    ],
  },
  {
    name: "Tool",
    url: "#",
    icon: <Wrench strokeWidth={1.5} />,
    segments: [
      {
        name: "List",
        url: "/tool/list",
      },
      {
        name: "Create",
        url: "/tool/create",
      },
    ],
  },
  {
    name: "Vehicle",
    url: "#",
    icon: <BusFront strokeWidth={1.5} />,
    segments: [
      {
        name: "List",
        url: "/vehicle/list",
      },
      {
        name: "Create",
        url: "/vehicle/create",
      },
      {
        name: "Request",
        url: "/vehicle/detail",
      },
    ],
  },
];

export const searchSectionList = [
  {
    name: "Dashboard",
    url: "/",
  },
  {
    name: "Inventory",
    url: "/user/list",
  },
  {
    name: "User List",
    url: "/user/list",
  },
  {
    name: "User Create",
    url: "/user/create",
  },
  {
    name: "User Detail",
    url: "/user/detail",
  },
];

export const userListCard = [
  {
    title: "Total User",
    value: "120",
    icon: <UsersRound />,
    detail: "Total every account",
    bgColor: "#e8e6fc",
    textColor: "#5748ff",
  },
  {
    title: "Unit Pelaksana",
    value: "1",
    icon: <Building />,
    detail: "Total region account",
    bgColor: "#ffd3d5",
    textColor: "#ff5e66",
  },
  {
    title: "Unit Layanan",
    value: "7",
    icon: <Warehouse />,
    detail: "Total every account",
    bgColor: "#d6ffe9",
    textColor: "#45d387",
  },
  {
    title: "Posko",
    value: "118",
    icon: <Home />,
    detail: "Total every account",
    bgColor: "#ffead8",
    textColor: "#ff983e",
  },
];

export const materialListCard = [
  {
    title: "Total Material",
    value: "400",
    icon: <Cable />,
    detail: "Total every account",
    bgColor: "#e8e6fc",
    textColor: "#5748ff",
  },
  {
    title: "Material Category",
    value: "3",
    icon: <RectangleEllipsis />,
    detail: "Total region account",
    bgColor: "#ffd3d5",
    textColor: "#ff5e66",
  },
  {
    title: "I Dunno",
    value: "7",
    icon: <Warehouse />,
    detail: "Total every account",
    bgColor: "#d6ffe9",
    textColor: "#45d387",
  },
];

export const categoryFilter = [
  {
    name: "All Category",
    value: "all-category",
  },
  {
    name: "Unit Pelaksana",
    value: "unit-pelaksana",
  },
  {
    name: "Unit Layanan",
    value: "unit-layanan",
  },
  {
    name: "Posko",
    value: "posko",
  },
];

export const statusFilter = [
  {
    name: "All Status",
    value: "all-status",
  },
  {
    name: "Active",
    value: "active",
  },
  {
    name: "Inactive",
    value: "inactive",
  },
];

export const materialCategoryFilter = [
  {
    name: "BH",
    value: "BH",
  },
  {
    name: "SMTH",
    value: "SMTH",
  },
  {
    name: "FR",
    value: "FR",
  },
];

export const materialStatusFilter = [
  {
    name: "All Status",
    value: "all-status",
  },
  {
    name: "available",
    value: "available",
  },
  {
    name: "unavailable",
    value: "unavailable",
  },
];

export const showedData = [
  {
    name: "10",
    value: "10",
  },
  {
    name: "25",
    value: "25",
  },
  {
    name: "50",
    value: "50",
  },
  {
    name: "All",
    value: "all",
  },
];
