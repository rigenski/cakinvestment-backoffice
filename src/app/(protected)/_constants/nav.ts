export const NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "lucide:layout-dashboard",
    isActive: true,
  },
  {
    title: "MASTER DATA",
    url: "#",
    isSection: true,
    items: [
      {
        title: "Akademi",
        url: "/master-data/akademi",
        icon: "lucide:book-open",
      },
      {
        title: "Event",
        url: "/master-data/event",
        icon: "lucide:calendar",
      },
      {
        title: "Research",
        url: "/master-data/research",
        icon: "lucide:file-text",
      },
      {
        title: "News",
        url: "/master-data/news",
        icon: "lucide:newspaper",
      },
      {
        title: "Signal",
        url: "/master-data/signal",
        icon: "lucide:signal",
      },
    ],
  },
  {
    title: "MEMBERSHIP",
    url: "#",
    isSection: true,
    items: [
      {
        title: "Plan",
        url: "/master-data/plan",
        icon: "lucide:package",
      },
      {
        title: "Promo",
        url: "/master-data/promo",
        icon: "lucide:percent",
      },
      {
        title: "Participant",
        url: "/membership/participant",
        icon: "lucide:users",
      },
      {
        title: "Transaction",
        url: "/membership/transaction",
        icon: "lucide:credit-card",
      },
      {
        title: "Withdrawal",
        url: "/membership/withdrawal",
        icon: "lucide:wallet",
      },
      {
        title: "Config",
        url: "/config",
        icon: "lucide:settings",
      },
    ],
  },
  {
    title: "MASTERCLASS",
    url: "#",
    isSection: true,
    items: [
      {
        title: "Plan",
        url: "/masterclass/plan",
        icon: "lucide:package",
      },
      {
        title: "Promo",
        url: "/masterclass/promo",
        icon: "lucide:percent",
      },
      {
        title: "Participant",
        url: "/masterclass/participant",
        icon: "lucide:users",
      },
      {
        title: "Transaction",
        url: "/masterclass/transaction",
        icon: "lucide:credit-card",
      },
      {
        title: "Config",
        url: "/masterclass/config",
        icon: "lucide:settings",
      },
    ],
  },
];
