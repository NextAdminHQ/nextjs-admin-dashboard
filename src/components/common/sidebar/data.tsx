import {
  AlphabetIcon,
  HomeIcon,
  PieChartIcon,
  TableIcon,
  UserIcon,
  Widget4Icon,
  WindowIcon
} from "./icon";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: <HomeIcon />,
        items: [
          {
            title: "E-commerce",
            url: "/",
          },
          
        ],
      },   
      {
        title: "Profile",
        url: "/profile",
        icon: <UserIcon />,
        items: [],
      },
      {
        title: "Forms",
        icon: <AlphabetIcon />,
        items: [
          {
            title: "Form Elements",
            url: "/form-elements",
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: <TableIcon />,
        items: [
          {
            title: "Basic Tables",
            url: "/tables/basic-tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: <WindowIcon />,
        items: [
          {
            title: "Error Page",
            url: "/error-page",
          },
          {
            title: "Terms & Conditions",
            url: "/terms-and-conditions",
          },
          {
            title: "Mail Success",
            url: "/mail-success",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: <PieChartIcon />,
        items: [
          {
            title: "Line Charts",
            url: "/charts/line-charts",
          },
          {
            title: "Bar Charts",
            url: "/charts/bar-charts",
          },
          {
            title: "Pie Charts",
            url: "/charts/pie-charts",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: <Widget4Icon />,
        items: [
          {
            title: "Accordion",
            url: "/ui-elements/accordion",
          },
          {
            title: "Avatars",
            url: "/ui-elements/avatars",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
          {
            title: "Breadcrumbs",
            url: "/ui-elements/breadcrumbs",
          },
          {
            title: "Progress",
            url: "/ui-elements/progress",
          },
          {
            title: "Tooltips",
            url: "/ui-elements/tooltips",
          },
        ],
      },
    ],
  },
];
