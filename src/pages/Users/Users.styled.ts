import { Box, Heading, Text, Link, Button } from "@chakra-ui/react";

export const PageContainer = Box;
export const PageHeading = Heading;
export const PageSubtitle = Text;
export const ActionLink = Link;
export const ActionButton = Button;
export const TableCard = Box;
export const TypeBadge = Box;
export const IconButton = Button;

export const containerStyles = {
  overflow: "hidden",
};
export const headerRowStyles = {
  display: "flex",
  flexDirection: { base: "column", sm: "row" } as const,
  flexWrap: "wrap" as const,
  alignItems: { base: "stretch", sm: "flex-start" },
  justifyContent: "space-between",
  gap: { base: 3, sm: 4 },
  mb: 4,
};
export const toolbarStyles = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: { base: 2, sm: 3 },
  flexShrink: 0,
  width: { base: "100%", sm: "auto" },
};
export const headingStyles = {
  size: { base: "lg" as const, md: "xl" as const },
  fontWeight: "bold" as const,
  color: "var(--color-text)",
  mb: 1,
};
export const subtitleStyles = { fontSize: "sm", color: "var(--color-muted)" };
export const searchBarWrapperStyles = {
  position: "relative" as const,
  maxW: { base: "100%", sm: "400px" },
  mb: 4,
  flex: { base: "1 1 100%", md: "0 0 auto" },
};
export const searchInputStyles = {
  w: "100%",
  pl: 10,
  pr: 4,
  py: 2.5,
  h: "40px",
  borderRadius: "md",
  borderWidth: "1px",
  borderColor: "var(--color-border)",
  bg: "var(--color-bg-surface)",
  color: "var(--color-text)",
  fontSize: "sm",
  _placeholder: { color: "var(--color-placeholder)" },
  _focus: {
    borderColor: "var(--color-input)",
    boxShadow: "none",
    outline: "none",
  },
};
export const searchIconWrapperStyles = {
  position: "absolute" as const,
  left: 3,
  top: "50%",
  transform: "translateY(-50%)",
  color: "var(--color-placeholder)",
  pointerEvents: "none" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const tableHeaderStyles = {
  textAlign: "left" as const,
  padding: "12px 16px",
  borderBottom: "1px solid var(--color-border)",
  background: "var(--color-bg-surface)",
  color: "var(--color-muted)",
  fontSize: "12px",
  fontWeight: 500,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};
export const tableCellStyles = {
  padding: "12px 16px",
  borderBottom: "1px solid var(--color-border)",
  verticalAlign: "middle" as const,
};
export const nameCellContentStyles = {
  display: "flex",
  alignItems: "center",
  gap: 3,
};
export const userAvatarStyles = {
  w: 9,
  h: 9,
  borderRadius: "full",
  background: "var(--gradient-primary)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "sm",
  flexShrink: 0,
};
export const refreshButtonStyles = {
  variant: "outline" as const,
  size: "sm" as const,
  borderRadius: "lg",
  borderWidth: "1px",
  borderColor: "var(--color-border)",
  color: "var(--color-muted)",
  bg: "var(--color-bg-surface)",
  fontWeight: "medium",
  px: 4,
  py: 2,
  minH: "40px",
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  _hover: {
    bg: "var(--color-bg-page)",
    borderColor: "var(--color-border)",
    color: "var(--color-text)",
  },
};
export const newUserButtonStyles = {
  background: "var(--gradient-primary)",
  color: "var(--color-primary-text)",
  size: "sm" as const,
  fontWeight: "medium" as const,
  borderRadius: "lg",
  border: "none",
  _hover: { opacity: 0.9 },
};
export const tableCardStyles = {
  bg: "var(--color-bg-surface)",
  borderRadius: "lg",
  boxShadow: "sm",
  overflowX: "auto" as const,
  overflowY: "visible",
  WebkitOverflowScrolling: "touch" as const,
  display: { base: "none", md: "block" },
};
export const mobileUserListStyles = {
  display: { base: "flex", md: "none" },
  flexDirection: "column" as const,
  gap: 3,
};
export const mobileUserCardStyles = {
  bg: "var(--color-bg-surface)",
  borderRadius: "lg",
  boxShadow: "sm",
  p: 4,
  display: "flex",
  alignItems: "center",
  gap: 4,
  flexWrap: "wrap" as const,
};
export const mobileUserCardMainStyles = {
  flex: "1 1 auto",
  minW: 0,
  display: "flex",
  alignItems: "center",
  gap: 3,
};
export const mobileUserCardMetaStyles = {
  display: "flex",
  flexDirection: "column" as const,
  minW: 0,
  flex: "1 1 200px",
};
export const mobileUserCardActionsStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  flexShrink: 0,
};
export const linkStyles = {
  color: "var(--color-accent)",
  fontWeight: "medium",
  _hover: { textDecoration: "underline" },
};
export const pillAdminStyles = {
  px: 3,
  py: 1,
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "medium",
  bg: "var(--color-primary)",
  color: "var(--color-primary-text)",
  display: "inline-block",
};
export const pillUserStyles = {
  px: 3,
  py: 1,
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "medium",
  bg: "var(--color-bg-page)",
  color: "var(--color-muted)",
  display: "inline-block",
};
export const iconButtonStyles = {
  size: "sm" as const,
  variant: "ghost" as const,
  p: 2,
  minW: 8,
  minH: 8,
  borderRadius: "lg",
  color: "var(--color-text)",
  _hover: { bg: "var(--color-primary)", color: "var(--color-primary-text)" },
};
export const deleteIconButtonStyles = {
  ...iconButtonStyles,
  color: "var(--color-destructive)",
  _hover: { bg: "var(--color-row-hover)", color: "var(--color-destructive)" },
};
