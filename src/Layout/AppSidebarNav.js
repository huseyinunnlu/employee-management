import { defineComponent, h, onMounted, ref, resolveComponent } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/Auth";
import {
  CBadge,
  CSidebarNav,
  CNavItem,
  CNavGroup,
  CNavTitle,
} from "@coreui/vue";
import nav from "@/core/config/MenuConfig.js";
import userNav from "@/core/config/UserMenuConfig.js";
const authStore = useAuthStore();
const normalizePath = (path) =>
  decodeURI(path)
    .replace(/#.*$/, "")
    .replace(/(index)?\.(html)$/, "");

const isActiveLink = (route, link) => {
  if (link === undefined) {
    return false;
  }

  if (route.hash === link) {
    return true;
  }

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);

  return currentPath === targetPath;
};

const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.to)) {
    return true;
  }

  if (item.items) {
    return item.items.some((child) => isActiveItem(route, child));
  }

  return false;
};

const AppSidebarNav = defineComponent({
  name: "AppSidebarNav",
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const firstRender = ref(true);

    onMounted(() => {
      firstRender.value = false;
    });

    const renderItem = (item) => {
      if (item.items) {
        let changedItem = item;
        return h(
          CNavGroup,
          {
            ...(firstRender.value && {
              visible: changedItem.items.some((child) =>
                isActiveItem(route, child)
              ),
            }),
          },
          {
            togglerContent: () => [
              h(resolveComponent("CIcon"), {
                customClassName: "nav-icon",
                name: changedItem.icon,
              }),
              te(changedItem.name) ? t(changedItem.name) : item.name,
            ],
            default: () => changedItem.items.map((child) => renderItem(child)),
          }
        );
      }

      return item.to
        ? h(
            RouterLink,
            {
              to: item.to,
              custom: false,
              style: {
                textDecoration: "none",
              },
            },
            {
              default: (props) =>
                h(
                  resolveComponent(item.component),
                  {
                    active: props.isActive,
                    href: props.href,
                    onClick: () => props.navigate(),
                  },
                  {
                    default: () => [
                      item.icon &&
                        h(resolveComponent("CIcon"), {
                          customClassName: "nav-icon",
                          name: item.icon,
                        }),
                      //

                      te(item.name) ? t(item.name) : item.name,
                      //
                      item.badge &&
                        h(
                          CBadge,
                          {
                            class: "ms-auto",
                            color: item.badge.color,
                          },
                          {
                            default: () => item.badge.text,
                          }
                        ),
                    ],
                  }
                ),
            }
          )
        : h(
            resolveComponent(item.component),
            {},
            {
              default: () => (te(item.name) ? t(item.name) : item.name),
            }
          );
    };

    return () =>
      h(
        CSidebarNav,
        {},
        {
          default: () =>
            authStore.role == 4
              ? userNav.map((item) => renderItem(item))
              : nav.map((item) => renderItem(item)),
        }
      );
  },
});

export { AppSidebarNav };
