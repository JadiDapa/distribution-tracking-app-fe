import { Home, UserRound } from "lucide-react";

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
    url: "/inventory",
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
