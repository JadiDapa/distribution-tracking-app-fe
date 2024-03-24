import { Building, Home, UserRound, UsersRound, Warehouse } from "lucide-react";

export const sidebarLink = [
  {
    name: "Dashboard",
    url: "#",
    icon: <Home strokeWidth={1.5} />,
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
      {
        name: "Detail",
        url: "/user/detail",
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
