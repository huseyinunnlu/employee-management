import { createRouter, createWebHistory } from "vue-router";
import { changeTitle } from "@/core/services/PageTitleService";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Layouts/Layout.vue"),
    redirect: "/dashboard",
    meta: {
      breadcrumb: "homePage",
    },
    children: [
      //dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          breadcrumb: "dashboard",
          isAuth: true,
        },
      },
      {
        path: "/profile/:slug",
        component: () => import("@/views/Layouts/Profile.vue"),
        meta: {
          breadcrumb: "profile",
          isAuth: true,
        },
        children: [
          {
            path: "/profile/:slug",
            name: "profile-index",
            component: () => import("@/views/Profile/Index.vue"),
          },
          {
            path: "/profile/:slug/account-info",
            name: "profile-account-info",
            component: () => import("@/views/Profile/AccountInfo.vue"),
          },
          {
            path: "/profile/:slug/personal-info",
            name: "profile-personal-info",
            component: () => import("@/views/Profile/PersonalInfo.vue"),
          },
          {
            path: "/profile/:slug/another-info",
            name: "profile-another-info",
            component: () => import("@/views/Profile/AnotherInfo.vue"),
          },
          {
            path: "/profile/:slug/debits",
            name: "profile-debits",
            component: () => import("@/views/Profile/Debit.vue"),
          },
          {
            path: "/profile/:slug/document",
            name: "profile-documents",
            component: () => import("@/views/Profile/Document.vue"),
          },
          {
            path: "/profile/:slug/absences",
            name: "profile-absences",
            component: () => import("@/views/Profile/Absence.vue"),
          },
          {
            path: "/profile/:slug/reports",
            name: "profile-reports",
            component: () => import("@/views/Profile/Report.vue"),
          },
        ],
      },
      //admin
      {
        path: "/admin/employees",
        name: "employees",
        component: () => import("@/views/Admin/Employees/List.vue"),
        meta: {
          breadcrumb: "employeeList",
        },
      },
      {
        path: "/admin/employees/add",
        name: "employees-add",
        component: () => import("@/views/Admin/Employees/Add/Add.vue"),
        meta: {
          breadcrumb: "addEmployee",
        },
      },
      {
        path: "/admin/employees/:id/edit",
        name: "employee-edit",
        component: () => import("@/views/Admin/Employees/Add/Add.vue"),
        meta: {
          breadcrumb: "editEmployee",
        },
      },

      //reports

      {
        redirect: "/admin/reports/employeereports/generalstatistics",
        path: "/admin/reports/employeereports",
        component: () => import("@/views/Layouts/EmployeeReport.vue"),
        meta: {
          breadcrumb: "employeeReports",
        },
        children: [
          {
            path: "/admin/reports/employeereports/generalstatistics",
            name: "general-statistics",
            component: () =>
              import("@/views/Admin/EmployeeReport/GeneralStatistics.vue"),
            meta: {
              breadcrumb: "generalStatistics",
            },
          },
        ],
      },
      {
        path: "/admin/reports/absencereports",
        component: () =>
          import("@/views/Admin/AbsenceReport/AbsenceReport.vue"),
        name: "absence-reports",
        meta: {
          breadcrumb: "absenceReports",
        },
      },

      {
        path: "/admin/reports/absencereports/add",
        component: () => import("@/views/Admin/AbsenceReport/Add.vue"),
        name: "add-absence",
        meta: {
          breadcrumb: "addAbsence",
        },
      },

      //absence
      {
        path: "/admin/reports/documentreports",
        component: () =>
          import("@/views/Admin/DocumentReport/DocumentReport.vue"),
        name: "document-reports",
        meta: {
          breadcrumb: "documentReports",
        },
      },

      //debitreports
      {
        path: "/admin/reports/debitreports",
        component: () => import("@/views/Admin/DebitReport/DebitReport.vue"),
        name: "debit-reports",
        meta: {
          breadcrumb: "debitReports",
        },
      },

      //expense

      {
        path: "/admin/expenses",
        component: () => import("@/views/Admin/ExpenseList/ExpenseList.vue"),
        name: "expense-list",
        meta: {
          breadcrumb: "expenseList",
        },
      },
      {
        path: "/admin/expenses/add",
        component: () => import("@/views/Admin/ExpenseList/Add.vue"),
        name: "expense-add",
        meta: {
          breadcrumb: "addExpense",
        },
      },

      {
        path: "/admin/tree",
        component: () => import("@/views/Layouts/Tree.vue"),
        meta: {
          breadcrumb: "companyCards",
        },
        children: [
          //addCompany
          {
            path: "/admin/tree/addcompany",
            name: "add-company",
            component: () =>
              import("@/views/Admin/CompanyTree/Company/Add.vue"),
            meta: {
              breadcrumb: "addCompany",
            },
          },
          {
            path: "/admin/tree/adddepartment",
            name: "add-department",
            component: () =>
              import("@/views/Admin/CompanyTree/Department/Add.vue"),
            meta: {
              breadcrumb: "addDepartment",
            },
          },
          {
            path: "/admin/tree/addworkplace",
            name: "add-workplace",
            component: () =>
              import("@/views/Admin/CompanyTree/WorkPlace/Add.vue"),
            meta: {
              breadcrumb: "addWorkPlace",
            },
          },
          {
            path: "/admin/tree",
            name: "company-cards",
            component: () => import("@/views/Admin/CompanyTree/Index.vue"),
            meta: {
              breadcrumb: "list",
            },
          },

          //Musteri
          {
            path: "/admin/tree/musteri/:id",
            name: "musteri",
            component: () => import("@/views/Layouts/Musteri.vue"),
            meta: {
              breadcrumb: "musteri",
            },
            children: [
              {
                path: "/admin/tree/musteri/:id",
                name: "musteri-info",
                component: () =>
                  import("@/views/Admin/CompanyTree/Musteri/Index.vue"),
                meta: {
                  breadcrumb: "musteriInfo",
                },
              },
              {
                path: "/admin/tree/musteri/:id/edit",
                name: "musteri-edit",
                component: () =>
                  import("@/views/Admin/CompanyTree/Musteri/Edit.vue"),
                meta: {
                  breadcrumb: "edit",
                },
              },
              {
                path: "/admin/tree/musteri/:id/employeerbranch",
                name: "employeer-branch",
                component: () =>
                  import(
                    "@/views/Admin/CompanyTree/Musteri/EmployeerBranch.vue"
                  ),
                meta: {
                  breadcrumb: "employeerBranch",
                },
              },
              {
                path: "/admin/tree/musteri/:id/company",
                name: "musteri-company",
                component: () =>
                  import("@/views/Admin/CompanyTree/Musteri/Company.vue"),
                meta: {
                  breadcrumb: "company",
                },
              },
              {
                path: "/admin/tree/musteri/:id/employee",
                name: "musteri-employees",
                component: () =>
                  import("@/views/Admin/CompanyTree/Musteri/Employee.vue"),
                meta: {
                  breadcrumb: "employees",
                },
              },
            ],
          },
          //company
          {
            path: "/admin/tree/company/:id",
            name: "company",
            component: () => import("@/views/Layouts/Company.vue"),
            meta: {
              breadcrumb: "company",
            },
            children: [
              {
                path: "/admin/tree/company/:id",
                name: "company-info",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/Index.vue"),
                meta: {
                  breadcrumb: "companyInfo",
                },
              },
              {
                path: "/admin/tree/company/:id/edit",
                name: "company-edit",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/Edit.vue"),
                meta: {
                  breadcrumb: "edit",
                },
              },
              {
                path: "/admin/tree/company/:id/employee",
                name: "company-employees",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/Employee.vue"),
                meta: {
                  breadcrumb: "employees",
                },
              },
              {
                path: "/admin/tree/company/:id/manager",
                name: "company-managers",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/Manager.vue"),
                meta: {
                  breadcrumb: "companyManagers",
                },
              },
              {
                path: "/admin/tree/company/:id/inventorytype",
                name: "company-inventory-types",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/InventoryType.vue"),
                meta: {
                  breadcrumb: "inventoryTypes",
                },
              },
              {
                path: "/admin/tree/company/:id/inventory",
                name: "company-inventories",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/Inventory.vue"),
                meta: {
                  breadcrumb: "inventories",
                },
              },
              {
                path: "/admin/tree/company/:id/expensetype",
                name: "company-expense-types",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/ExpenseType.vue"),
                meta: {
                  breadcrumb: "expenseTypes",
                },
              },
              {
                path: "/admin/tree/company/:id/department",
                name: "company-departments",
                component: () =>
                  import("@/views/Admin/CompanyTree/Company/Department.vue"),
                meta: {
                  breadcrumb: "department",
                },
              },
            ],
          },
          //department
          {
            path: "/admin/tree/department/:id",
            name: "department",
            component: () => import("@/views/Layouts/Department.vue"),
            meta: {
              breadcrumb: "department",
            },
            children: [
              {
                path: "/admin/tree/department/:id",
                name: "department-info",
                component: () =>
                  import("@/views/Admin/CompanyTree/Department/Index.vue"),
                meta: {
                  breadcrumb: "departmentInfo",
                },
              },
              {
                path: "/admin/tree/department/:id/edit",
                name: "department-edit",
                component: () =>
                  import("@/views/Admin/CompanyTree/Department/Edit.vue"),
                meta: {
                  breadcrumb: "edit",
                },
              },
              {
                path: "/admin/tree/department/:id/manager",
                name: "department-managers",
                component: () =>
                  import("@/views/Admin/CompanyTree/Department/Manager.vue"),
                meta: {
                  breadcrumb: "departmentManagers",
                },
              },
              {
                path: "/admin/tree/department/:id/employee",
                name: "department-employees",
                component: () =>
                  import("@/views/Admin/CompanyTree/Department/Employee.vue"),
                meta: {
                  breadcrumb: "employees",
                },
              },
              {
                path: "/admin/tree/department/:id/position",
                name: "department-positions",
                component: () =>
                  import("@/views/Admin/CompanyTree/Department/Position.vue"),
                meta: {
                  breadcrumb: "positions",
                },
              },
            ],
          },
          //workplace
          {
            path: "/admin/tree/workplace/:id",
            name: "workplace",
            component: () => import("@/views/Layouts/WorkPlace.vue"),
            meta: {
              breadcrumb: "workPlace",
            },
            children: [
              {
                path: "/admin/tree/workplace/:id",
                name: "workplace-info",
                component: () =>
                  import("@/views/Admin/CompanyTree/WorkPlace/Index.vue"),
                meta: {
                  breadcrumb: "workPlaceInfo",
                },
              },
              {
                path: "/admin/tree/workplace/:id/workinghours",
                name: "workplace-working-hours",
                component: () =>
                  import("@/views/Admin/CompanyTree/WorkPlace/WorkingHour.vue"),
                meta: {
                  breadcrumb: "workingHours",
                },
              },
              {
                path: "/admin/tree/workplace/:id/employee",
                name: "workplace-employees",
                component: () =>
                  import("@/views/Admin/CompanyTree/WorkPlace/Employee.vue"),
                meta: {
                  breadcrumb: "employees",
                },
              },
              {
                path: "/admin/tree/workplace/:id/edit",
                name: "workplace-edit",
                component: () =>
                  import("@/views/Admin/CompanyTree/WorkPlace/Edit.vue"),
                meta: {
                  breadcrumb: "edit",
                },
              },
            ],
          },
        ],
      },

      //settings
      {
        path: "/admin/tree/settings",
        component: () => import("@/views/Layouts/Settings.vue"),
        meta: {
          breadcrumb: "settings",
        },
        children: [
          {
            path: "/admin/tree/settings",
            name: "settings-index",
            component: () => import("@/views/Admin/Settings/Index.vue"),
            meta: {
              breadcrumb: "list",
            },
          },
          {
            path: "/admin/tree/settings/documentype",
            name: "document-types",
            component: () => import("@/views/Admin/Settings/DocumentTypes.vue"),
            meta: {
              breadcrumb: "documentTypes",
            },
          },
        ],
      },

      //myexpenses
      {
        path: "/myexpenses",
        component: () => import("@/views/Expense/List.vue"),
        name: "myexpenses",
        meta: {
          breadcrumb: "myExpenses",
        },
      },
      {
        path: "/myexpenses/addexpenserequest",
        component: () => import("@/views/Expense/Add.vue"),
        name: "expense-request-add",
        meta: {
          breadcrumb: "expenseRequest",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/views/Layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/Auth/SignIn.vue"),
        meta: {
          breadcrumb: "signIn",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/Pages/Page404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = window.localStorage.getItem("id_token");
  const role = window.localStorage.getItem("id_role");

  //changes title with breadcrumb or title data inside every route's meta object
  changeTitle(to);

  const authRoutes = [
    "dashboard",
    "profile-index",
    "profile-account-info",
    "profile-personal-info",
    "profile-another-info",
    "profile-debits",
    "profile-documents",
    "profile-absences",
    "profile-reports",
    "myexpenses",
    "expense-request-add",
  ];
  const adminRoutes = [
    "employees",
    "employees-add",
    "employee-edit",
    "general-statistics",
    "absence-reports",
    "add-absence",
    "document-reports",
    "debit-reports",
    "expense-list",
    "expense-add",
    "add-company",
    "add-department",
    "add-workplace",
    "company-cards",
    "musteri-info",
    "musteri-edit",
    "employeer-branch",
    "musteri-company",
    "musteri-employees",
    "company-info",
    "company-edit",
    "company-employees",
    "company-managers",
    "company-inventory-types",
    "company-inventories",
    "company-expense-types",
    "company-departments",
    "department-info",
    "department-edit",
    "department-managers",
    "department-employees",
    "department-positions",
    "workplace",
    "workplace-info",
    "workplace-working-hours",
    "workplace-employees",
    "workplace-edit",
    "settings-index",
    "document-types",
  ];
  const noAuthRoutes = ["sign-in"];
  if (authRoutes.indexOf(to.name) > -1 && !token) {
    router.push({ name: "sign-in" });
  } else if (noAuthRoutes.indexOf(to.name) > -1 && token) {
    router.push({ name: "dashboard" });
  } else if (adminRoutes.indexOf(to.name) > -1 && role != "1") {
    router.push({ name: "dashboard" });
  } else {
    next();
  }
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
