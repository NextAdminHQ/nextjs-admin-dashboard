import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "TABLEAU DE BORD",
    items: [
      {
        title: "Tableau de bord",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Calendrier",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
    ],
  },
  {
    label: "HÉBERGEMENT",
    items: [
      {
        title: "Résidences",
        url: "/residences",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Logements",
        url: "/logements",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Réservations",
        url: "/reservations",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Check-in",
        url: "/check-in",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "Check-out",
        url: "/check-out",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "Cautions",
        url: "/cautions",
        icon: Icons.Alphabet,
        items: [],
      },
    ],
  },
  {
    label: "OPÉRATIONS",
    items: [
      {
        title: "Housekeeping",
        url: "/housekeeping",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Maintenance",
        url: "/maintenance",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Restaurant & Bar",
        url: "/restaurant",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Stocks",
        url: "/stocks",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Événements",
        url: "/evenements",
        icon: Icons.Calendar,
        items: [],
      },
    ],
  },
  {
    label: "POS Restaurant",
    items: [
      {
        title: "Tableau de bord",
        url: "/pos",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Plan de salle",
        url: "/pos/tables",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Prise de commande",
        url: "/pos/order-entry",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Commandes",
        url: "/pos/orders",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Cuisine (KDS)",
        url: "/pos/kitchen",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "Encaissements",
        url: "/pos/checkout",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Menus",
        url: "/pos/menu",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Catégories",
            url: "/pos/menu/categories",
            icon: Icons.Table,
          },
          {
            title: "Articles",
            url: "/pos/menu/articles",
            icon: Icons.PieChart,
          },
        ],
      },
      {
        title: "Stocks",
        url: "/pos/stock",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Inventaire",
            url: "/pos/stock",
            icon: Icons.Table,
          },
          {
            title: "Mouvements",
            url: "/pos/stock/mouvements",
            icon: Icons.Authentication,
          },
          {
            title: "Alertes",
            url: "/pos/stock/alertes",
            icon: Icons.User,
          },
        ],
      },
      {
        title: "Rapports",
        url: "/pos/reports",
        icon: Icons.PieChart,
        items: [
          {
            title: "Ventes",
            url: "/pos/reports/ventes",
            icon: Icons.Table,
          },
          {
            title: "Produits",
            url: "/pos/reports/produits",
            icon: Icons.FourCircle,
          },
          {
            title: "Serveurs",
            url: "/pos/reports/serveurs",
            icon: Icons.User,
          },
          {
            title: "Paiements",
            url: "/pos/reports/paiements",
            icon: Icons.Alphabet,
          },
        ],
      },
      {
        title: "Paramètres POS",
        url: "/pos/settings",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      {
        title: "Finances",
        url: "/finances",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Personnel",
        url: "/personnel",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Rapports",
        url: "/rapports",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Notifications",
        url: "/notifications",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Administration",
        url: "/administration",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "IA",
        url: "/intelligence-artificielle",
        icon: Icons.Alphabet,
        items: [],
      },
    ],
  },
  {
    label: "COMPTE",
    items: [
      {
        title: "Profil",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Paramètres",
        url: "/pages/settings",
        icon: Icons.Alphabet,
        items: [],
      },
    ],
  },
];
