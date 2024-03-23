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
