import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  Building,
  Cable,
  Home,
  PackageOpen,
  RectangleEllipsis,
  UsersRound,
  Warehouse,
} from "lucide-react";

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
    name: "Buah",
    value: "2",
  },
  {
    name: "Set",
    value: "3",
  },
  {
    name: "Kg",
    value: "4",
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

export const requestListCard = [
  {
    title: "Total Request",
    value: "400",
    icon: <PackageOpen />,
    detail: "Total of every request sent",
    bgColor: "#e8e6fc",
    textColor: "#5748ff",
  },
  {
    title: "Accepted",
    value: "3",
    icon: <ArchiveRestore />,
    detail: "Total of accepted request",
    bgColor: "#d6ffe9",
    textColor: "#45d387",
  },
  {
    title: "Pending",
    value: "7",
    icon: <Archive />,
    detail: "Total of pending request",
    bgColor: "#fff9d6",
    textColor: "#d3c945",
  },
  {
    title: "Declined",
    value: "7",
    icon: <ArchiveX />,
    detail: "Total of declined request",
    bgColor: "#ffd3d5",
    textColor: "#ff5e66",
  },
];
