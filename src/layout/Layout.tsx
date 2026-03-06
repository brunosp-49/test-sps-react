import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Outlet,
  NavLink as RouterNavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { logout, selectIsAuthenticated, selectUser } from "../store/authSlice";
import {
  DashboardIcon,
  UsersIcon,
  LogoutIcon,
  ShieldIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  CloseIcon,
} from "../components/icons";
import { LanguageSelector } from "../components/LanguageSelector/LanguageSelector";
import { useTheme } from "../theme/ThemeContext";
import { useIsMobile } from "../hooks/useMediaQuery";
import { Button } from "@chakra-ui/react";
import {
  LayoutContainer,
  AppHeader,
  BodyRow,
  Sidebar,
  MainContent,
  MainContentArea,
  Nav,
  NavLinkStyled,
  LogoWrapper,
  LogoIconBox,
  LogoutContainer,
  LogoutButton,
  ThemeToggleButton,
  containerStyles,
  appHeaderStyles,
  headerLeftLogoStyles,
  headerLogoIconStyles,
  bodyRowStyles,
  rightColumnStyles,
  sidebarStyles,
  sidebarLogoSectionStyles,
  logoWrapperStyles,
  logoIconBoxStyles,
  sidebarLogoTextStyles,
  sidebarPanelTitleStyles,
  navMenuLabelStyles,
  navStyles,
  sidebarIconBoxStyles,
  linkStyles,
  activeLinkStyles,
  themeToggleButtonStyles,
  logoutContainerStyles,
  logoutButtonStyles,
  mainStyles,
  mainContentAreaStyles,
  headerAndMenuWrapperStyles,
  mobileMenuPanelStyles,
  mobileMenuNavListStyles,
  mobileMenuNavLinkStyles,
  mobileMenuNavLinkActiveStyles,
  mobileMenuDividerStyles,
  mobileMenuLogoutStyles,
  mobileMenuIconBoxStyles,
} from "./Layout.styled";

function LogoMark() {
  return <ShieldIcon size={20} />;
}

function UserAvatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const initial = name.charAt(0).toUpperCase();
  const sizeMap = { sm: { w: 8, h: 8, fontSize: "md" }, md: { w: 10, h: 10, fontSize: "lg" } };
  const s = sizeMap[size];
  return (
    <Box
      w={s.w}
      h={s.h}
      borderRadius="full"
      bg="var(--gradient-primary)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      fontSize={s.fontSize}
      flexShrink={0}
    >
      {initial}
    </Box>
  );
}

const navPaths = [
  { to: "/", key: "dashboard" as const, icon: DashboardIcon },
  { to: "/users", key: "users" as const, icon: UsersIcon },
];

function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const { mode, toggle } = useTheme();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin", { replace: true });
  };

  return (
    <LayoutContainer {...containerStyles}>
      {isAuthenticated && isMobile && (
        <Box
          className={`layout-sidebar-overlay ${
            mobileMenuOpen ? "overlay-visible" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
      )}
      <BodyRow {...bodyRowStyles} className="layout-body-row">
        <Sidebar
          {...sidebarStyles}
          className={`layout-sidebar ${
            isMobile && mobileMenuOpen ? "sidebar-open" : ""
          }`}
        >
          <Box {...sidebarLogoSectionStyles}>
            <LogoWrapper {...logoWrapperStyles}>
              <LogoIconBox {...logoIconBoxStyles}>
                <LogoMark />
              </LogoIconBox>
              <Box>
                <Box {...sidebarLogoTextStyles}>{t("common.appName")}</Box>
                <Box {...sidebarPanelTitleStyles}>{t("nav.panelTitle")}</Box>
              </Box>
            </LogoWrapper>
          </Box>
          <Box
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            gap={3}
            px={3}
            pb={3}
            borderBottomWidth="1px"
            borderBottomColor="var(--color-sidebar-accent)"
          >
            <LanguageSelector size="sm" compact />
            <ThemeToggleButton
              {...themeToggleButtonStyles}
              w="auto"
              onClick={toggle}
              type="button"
              aria-label={
                mode === "light"
                  ? t("common.themeDarkAria")
                  : t("common.themeLightAria")
              }
              color="rgba(255,255,255,0.9)"
              _hover={{ bg: "var(--color-sidebar-accent)", color: "white" }}
              display="inline-flex"
              alignItems="center"
              gap={2}
              px={3}
              py={2}
              minH="36px"
              borderRadius="md"
            >
              {mode === "light" ? (
                <MoonIcon size={18} />
              ) : (
                <SunIcon size={18} />
              )}
              <Box as="span" fontSize="sm">
                {mode === "light"
                  ? t("common.themeDark")
                  : t("common.themeLight")}
              </Box>
            </ThemeToggleButton>
          </Box>
          <Box {...navMenuLabelStyles}>{t("nav.menuLabel")}</Box>
          <Nav as="nav" {...navStyles}>
            {navPaths.map(({ to, key, icon: Icon }) => {
              const isActive =
                location.pathname === to ||
                (to !== "/" && location.pathname.startsWith(to));
              return (
                <NavLinkStyled
                  key={to}
                  asChild
                  {...(isActive ? activeLinkStyles : linkStyles)}
                >
                  <RouterNavLink to={to} end={to === "/"}>
                    <Box {...sidebarIconBoxStyles}>
                      <Icon size={18} />
                    </Box>
                    {t(`nav.${key}`)}
                  </RouterNavLink>
                </NavLinkStyled>
              );
            })}
          </Nav>
          {isAuthenticated && (
            <LogoutContainer {...logoutContainerStyles}>
              <LogoutButton
                {...logoutButtonStyles}
                onClick={handleLogout}
                type="button"
              >
                <Box {...sidebarIconBoxStyles}>
                  <LogoutIcon size={14} />
                </Box>
                {t("nav.logout")}
              </LogoutButton>
            </LogoutContainer>
          )}
        </Sidebar>
        <Box {...rightColumnStyles}>
          {isAuthenticated && (
            <Box {...headerAndMenuWrapperStyles}>
              <AppHeader {...appHeaderStyles} position="relative">
                <Box display="flex" alignItems="center" gap={3} flexShrink={0}>
                {isMobile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen((v) => !v)}
                    aria-label={
                      mobileMenuOpen ? t("common.close") : t("nav.menu")
                    }
                    p={1.5}
                    minW={8}
                    minH={8}
                    color="var(--color-text)"
                    _hover={{ bg: "var(--color-bg-page)", borderRadius: "md" }}
                  >
                    {mobileMenuOpen ? (
                      <CloseIcon size={22} />
                    ) : (
                      <MenuIcon size={22} />
                    )}
                  </Button>
                )}
                <Box {...headerLeftLogoStyles}>
                  <Box {...headerLogoIconStyles}>
                    <ShieldIcon size={18} />
                  </Box>
                  <Box
                    fontSize={{ base: "sm", sm: "md" }}
                    fontWeight="bold"
                    color="var(--color-text)"
                  >
                    {t("common.appName")}
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={{ base: 2, sm: 3 }}
                flexShrink={0}
              >
                <LanguageSelector size="sm" compact />
                <ThemeToggleButton
                  {...themeToggleButtonStyles}
                  onClick={toggle}
                  type="button"
                  aria-label={
                    mode === "light"
                      ? t("common.themeDarkAria")
                      : t("common.themeLightAria")
                  }
                  color="var(--color-muted)"
                  _hover={{
                    color: "var(--color-text)",
                    bg: "var(--color-bg-page)",
                  }}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  px={{ base: 2, md: 4 }}
                  py={{ base: 2, md: 2.5 }}
                  minH={{ base: 8, md: "40px" }}
                  minW={{ base: 8, md: "auto" }}
                  borderRadius="md"
                >
                  {mode === "light" ? (
                    <MoonIcon size={20} />
                  ) : (
                    <SunIcon size={20} />
                  )}
                  <Box as="span" whiteSpace="nowrap" display={{ base: "none", md: "inline" }}>
                    {mode === "light"
                      ? t("common.themeDark")
                      : t("common.themeLight")}
                  </Box>
                </ThemeToggleButton>
                {user?.name && (
                  <UserAvatar name={user.name} size={isMobile ? "sm" : "md"} />
                )}
              </Box>
            </AppHeader>
            {isMobile && mobileMenuOpen && (
              <Box
                {...mobileMenuPanelStyles}
                className="mobile-menu-panel"
                as="nav"
                role="navigation"
                aria-label={t("nav.menu")}
              >
                <Box as="div" {...mobileMenuNavListStyles}>
                  {navPaths.map(({ to, key, icon: Icon }) => {
                    const isActive =
                      location.pathname === to ||
                      (to !== "/" && location.pathname.startsWith(to));
                    return (
                      <NavLinkStyled
                        key={to}
                        asChild
                        {...(isActive ? mobileMenuNavLinkActiveStyles : mobileMenuNavLinkStyles)}
                      >
                        <RouterNavLink to={to} end={to === "/"} onClick={() => setMobileMenuOpen(false)}>
                          <Box {...mobileMenuIconBoxStyles}>
                            <Icon size={18} />
                          </Box>
                          {t(`nav.${key}`)}
                        </RouterNavLink>
                      </NavLinkStyled>
                    );
                  })}
                  <Box {...mobileMenuDividerStyles} aria-hidden />
                  <LogoutButton
                    {...mobileMenuLogoutStyles}
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    type="button"
                  >
                    <Box {...mobileMenuIconBoxStyles}>
                      <LogoutIcon size={18} />
                    </Box>
                    {t("nav.logout")}
                  </LogoutButton>
                </Box>
              </Box>
            )}
            </Box>
          )}
          <MainContent
            as="main"
            {...mainStyles}
            className="layout-main-content"
          >
            <MainContentArea {...mainContentAreaStyles}>
              <Outlet />
            </MainContentArea>
          </MainContent>
        </Box>
      </BodyRow>
    </LayoutContainer>
  );
}

const Box = LayoutContainer;

export default Layout;
