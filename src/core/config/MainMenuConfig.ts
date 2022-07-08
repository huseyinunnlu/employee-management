const DocMenuConfig = [
  {
    pages: [
      {
        heading: "Kontrol Paneli",
        route: "/dashboard",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
    isAdmin: true,
    pages: [
      {
        sectionTitle: "Personel Yönetimi",
        route: "/admin/employees",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
        sub: [
          {
            heading: "Personel Kartları",
            route: "/admin/employees",
          },
          // {
          //   heading: "Online Kullanıcılar",
          //   route: "/crafted/pages/profile/overview",
          // },
        ],
      },
      {
        sectionTitle: "Raprolar",
        route: "/admin/reports/",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
        sub: [
          {
            heading: "Personel Raporları",
            route: "/admin/reports/employeereports",
          },
          {
            heading: "İzin Raporları",
            route: "/admin/reports/absencereports",
          },
          {
            heading: "Zimmet Raporu",
            route: "/admin/reports/debitreports",
          },
          {
            heading: "Özlük Dosyası Raporları",
            route: "/admin/reports/documentreports",
          },
        ],
      },
      {
        sectionTitle: "Masraf Yönetimi",
        route: "/admin/expenses",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
        sub: [
          {
            heading: "Masraf Listesi",
            route: "/admin/expenses",
          },
        ],
      },
      // {
      //   sectionTitle: "Eğitim Yönetimi",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "Eğitimler",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Eğitim Kategorileri",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Eğitim Raporları",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      // {
      //   sectionTitle: "Görev Yönetimi",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "Görevler",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Projeler",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Müşteriler",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "İş Planı",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Görev Raporları",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      // {
      //   sectionTitle: "İşe Alım Yönetimi",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "İş Başvuruları",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Personel Talepleri",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "İş Başvuru Davetleri",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      // {
      //   sectionTitle: "Mesai Yönetimi",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "Mesai Planlama",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Mesai Raporlama",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Mesai Planlama / Onaya Gönderme",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Alacak/Borç Yönetimi",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      // {
      //   sectionTitle: "Toplu İşlemler",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "Personel Yükleme",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Envanter Yükleme",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "İzin Yükleme",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Bordro Yükleme",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Toplu Gönderim",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Bilgi Bankası",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Ortak Şirket Dosyaları",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      // {
      //   sectionTitle: "Bordro Yönetimi",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "Puantaj Kaydı",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Bordro",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      // {
      //   sectionTitle: "Raporlar",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "Ziyaret Raporları",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      // {
      //   sectionTitle: "ORIS",
      //   route: "/crafted",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      //   sub: [
      //     {
      //       heading: "Form Yönetimi",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Form Raporları",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //     {
      //       heading: "Veri Kaynakları",
      //       route: "/crafted/pages/profile/overview",
      //     },
      //   ],
      // },
      {
        sectionTitle: "Şirket Kartları",
        route: "/admin/tree",
        svgIcon: "media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
        sub: [
          {
            heading: "Ayarlar",
            route: "/admin/tree/settings",
          },
          {
            heading: "Liste",
            route: "/admin/tree",
          },
          // {
          //   heading: "Müşteri Bilgilerim",
          //   route: "/crafted/pages/profile/overview",
          // },
        ],
      },
    ],
  },
  {
    isAdmin: false,
    pages: [
      // {
      //   heading: "Mesai takvimim",
      //   route: "/admin/employees",
      //   svgIcon: "media/icons/duotune/art/art002.svg",
      //   fontIcon: "bi-app-indicator",
      // },
    ],
  },
];

export default DocMenuConfig;
