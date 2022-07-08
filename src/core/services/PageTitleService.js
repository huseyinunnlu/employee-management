import i18n from "@/core/plugins/i18n/i18n.js";
const { t, te } = i18n.global;

i18n.global.locale = window.localStorage.getItem("lang") || "en-US";

const getChangedTitle = (to) => {
  const rawTitle = to.meta.title || to.meta.breadcrumb;
  let transtaledTitle = rawTitle && te(rawTitle) ? `${t(rawTitle)} |` : "";

  return `${transtaledTitle} OpenPem`;
};

const changeTitle = (to) => {
  document.title = getChangedTitle(to);
};

export { changeTitle };
