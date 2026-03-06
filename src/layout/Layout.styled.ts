import { Box, Flex, Link, Button } from "@chakra-ui/react";

export const LayoutContainer = Box;
export const AppHeader = Box;
export const BodyRow = Box;
export const Sidebar = Box;
export const MainContent = Box;
export const MainContentArea = Box;
export const Nav = Flex;
export const NavLinkStyled = Link;
export const LogoWrapper = Box;
export const LogoIconBox = Box;
export const LogoutContainer = Box;
export const LogoutButton = Button;
export const ThemeToggleButton = Button;

export const containerStyles = {
  minH: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  bg: "var(--color-bg-page)",
};
export const appHeaderStyles = {
  flexShrink: 0,
  height: { base: "56px", md: 68 },
  minHeight: { base: "56px", md: 68 },
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: { base: 2, sm: 4 },
  py: 0,
  gap: { base: 2, sm: 4 },
  bg: "var(--color-bg-surface)",
  borderBottomWidth: "1px",
  borderBottomColor: "var(--color-border)",
  boxSizing: "border-box",
};

export const headerLeftLogoStyles = {
  display: { base: "flex", md: "none" },
  alignItems: "center",
  gap: 2,
  color: "var(--color-text)",
};
export const headerLogoIconStyles = {
  w: 8,
  h: 8,
  borderRadius: "md",
  background: "var(--gradient-primary)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const headerAndMenuWrapperStyles = {
  position: { base: "sticky", md: "relative" } as const,
  top: 0,
  zIndex: 50,
  bg: "var(--color-bg-surface)",
};
export const mobileMenuPanelStyles = {
  width: "100%",
  bg: "var(--color-bg-surface)",
  borderBottomWidth: "1px",
  borderBottomColor: "var(--color-border)",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
  overflow: "hidden",
  py: 2,
  px: 3,
};
export const mobileMenuNavListStyles = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 1,
  px: 0,
};
const mobileMenuButtonBase = {
  display: "flex",
  alignItems: "center",
  gap: 3,
  px: 3,
  py: 2.5,
  minHeight: "44px",
  borderRadius: "xl",
  fontSize: "sm",
  fontWeight: "500",
  transition: "background 0.15s ease, color 0.15s ease",
  _focus: { outline: "none", boxShadow: "none" },
  _focusVisible: { outline: "none", boxShadow: "0 0 0 2px var(--color-primary)" },
};
export const mobileMenuNavLinkStyles = {
  ...mobileMenuButtonBase,
  textDecoration: "none",
  color: "var(--color-muted)",
  bg: "var(--color-bg-surface)",
  _hover: { bg: "var(--color-row-hover)", color: "var(--color-text)" },
  _active: { bg: "var(--color-row-hover)" },
};
export const mobileMenuNavLinkActiveStyles = {
  ...mobileMenuButtonBase,
  textDecoration: "none",
  background: "var(--gradient-sidebar-active)",
  color: "white",
  fontWeight: "600",
  _hover: {
    background: "var(--gradient-sidebar-active)",
    opacity: 0.95,
    color: "white",
  },
  _focusVisible: { outline: "none", boxShadow: "0 0 0 2px var(--color-primary)" },
};
export const mobileMenuDividerStyles = {
  borderTopWidth: "1px",
  borderTopColor: "var(--color-border)",
  my: 2,
};
export const mobileMenuLogoutStyles = {
  ...mobileMenuButtonBase,
  color: "var(--color-muted)",
  bg: "var(--color-bg-surface)",
  border: "none",
  w: "100%",
  cursor: "pointer",
  textAlign: "left" as const,
  _hover: { bg: "var(--color-row-hover)", color: "var(--color-text)" },
  _active: { bg: "var(--color-row-hover)" },
  _focusVisible: { outline: "none", boxShadow: "0 0 0 2px var(--color-primary)" },
};
export const mobileMenuIconBoxStyles = {
  w: 5,
  h: 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "currentColor",
};
export const logoWrapperStyles = {
  display: "flex",
  alignItems: "center",
  gap: 3,
};
export const bodyRowStyles = {
  flex: 1,
  display: "flex",
  flexDirection: "row" as const,
  minHeight: 0,
  overflow: "hidden",
};
export const rightColumnStyles = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  minHeight: 0,
  minW: 0,
  overflow: "hidden",
};
export const sidebarStyles = {
  w: "260px",
  minW: "260px",
  bg: "var(--color-sidebar-bg)",
  borderRightWidth: "1px",
  borderRightColor: "var(--color-sidebar-accent)",
  display: { base: "none", md: "flex" },
  flexDirection: "column" as const,
};

export const sidebarLogoSectionStyles = {
  p: 4,
  flexShrink: 0,
};
export const logoIconBoxStyles = {
  w: 9,
  h: 9,
  borderRadius: "md",
  background: "var(--gradient-primary)",
  color: "var(--color-primary-text)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};
export const logoTextStyles = {
  fontWeight: "bold" as const,
  fontSize: "lg",
  color: "var(--color-text)",
};
export const sidebarLogoTextStyles = {
  fontWeight: "bold" as const,
  fontSize: "lg",
  color: "white",
};
export const sidebarPanelTitleStyles = {
  fontSize: "xs",
  color: "rgba(255,255,255,0.7)",
  mt: 0.5,
};
export const themeToggleButtonStyles = {
  justifyContent: "flex-start",
  gap: 3,
  color: "var(--color-muted)",
  bg: "transparent",
  _hover: { bg: "var(--color-bg-page)", color: "var(--color-muted)" },
};
export const logoutContainerStyles = {
  p: 3,
  borderTopWidth: "1px",
  borderTopColor: "var(--color-sidebar-accent)",
};
export const logoutButtonStyles = {
  w: "100%",
  fontWeight: "300",
  justifyContent: "flex-start",
  gap: 3,
  px: 3,
  py: 3,
  minH: "48px",
  color: "rgba(255,255,255,0.9)",
  bg: "transparent",
  borderRadius: "md",
  _hover: { bg: "var(--color-sidebar-accent)", color: "white" },
};
export const navMenuLabelStyles = {
  px: 3,
  pt: 3,
  pb: 2,
  fontSize: "xs",
  fontWeight: "medium",
  color: "rgba(255,255,255,0.6)",
  textTransform: "uppercase" as const,
  letterSpacing: "wider",
};
export const navStyles = {
  flex: 1,
  px: 2,
  pb: 2,
  gap: 1,
  flexDirection: "column" as const,
};
export const navItemStyles = {
  display: "flex",
  alignItems: "center",
  gap: 3,
  px: 3,
  py: 1,
  borderRadius: "xl",
  fontWeight: "medium",
  textDecoration: "none",
};
export const sidebarIconBoxStyles = {
  w: 8,
  h: 8,
  borderRadius: "md",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "white",
};
export const linkStyles = {
  ...navItemStyles,
  color: "rgba(255,255,255,0.9)",
  _hover: { bg: "var(--color-sidebar-accent)", color: "white" },
  _focus: { outline: "none", boxShadow: "none" },
  _focusVisible: { outline: "none", boxShadow: "none" },
};
export const activeLinkStyles = {
  ...navItemStyles,
  background: "var(--gradient-sidebar-active)",
  color: "white",
  fontWeight: "400",
  _hover: {
    background: "var(--gradient-sidebar-active)",
    color: "white",
    opacity: 0.95,
  },
  _focus: { outline: "none", boxShadow: "none", border: "none" },
  _focusVisible: { outline: "none", boxShadow: "none", border: "none" },
};
export const mainStyles = {
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  bg: "var(--color-bg-page)",
};
export const mainContentAreaStyles = {
  flex: 1,
  overflow: "auto",
  p: { base: 4, sm: 5, md: 6, lg: 8 },
};
