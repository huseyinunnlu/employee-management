export default [
  {
    component: "CNavItem",
    name: "dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
  },
  {
    component: "CNavGroup",
    name: "employeeManangment",
    to: "/admin/employees",
    icon: "cil-user",
    items: [
      {
        component: "CNavItem",
        name: "employeeCards",
        to: "/admin/employees",
        icon: "cil-list",
      },
    ],
  },
  {
    component: "CNavGroup",
    name: "reports",
    to: "/admin/reports",
    icon: "cil-file",
    items: [
      {
        component: "CNavItem",
        name: "employeeReports",
        to: "/admin/reports/employeereports",
        icon: "cil-people",
      },
      {
        component: "CNavItem",
        name: "absenceReports",
        to: "/admin/reports/absencereports",
        icon: "cil-user-x",
      },
      {
        component: "CNavItem",
        name: "debitReports",
        to: "/admin/reports/debitreports",
        icon: "cil-money",
      },
      {
        component: "CNavItem",
        name: "documentReports",
        to: "/admin/reports/documentreports",
        icon: "cil-file",
      },
    ],
  },
  {
    component: "CNavGroup",
    name: "expenseManangment",
    to: "/admin/expenses",
    icon: "cil-file",
    items: [
      {
        component: "CNavItem",
        name: "expenseList",
        to: "/admin/expenses",
        icon: "cil-people",
      },
    ],
  },
  {
    component: "CNavGroup",
    name: "companyCards",
    to: "/admin/tree",
    icon: "cil-file",
    items: [
      {
        component: "CNavItem",
        name: "settings",
        to: "/admin/tree/settings",
        icon: "cil-cog",
      },
      {
        component: "CNavItem",
        name: "list",
        to: "/admin/tree",
        icon: "cil-list-rich",
      },
    ],
  },
];
