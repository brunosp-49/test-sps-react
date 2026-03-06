import { Box, Heading, Text } from "@chakra-ui/react";

export const PageContainer = Box;
export const PageHeading = Heading;
export const PageSubtitle = Text;
export const StatsGrid = Box;
export const StatCard = Box;
export const StatCardContent = Box;
export const StatCardIconBox = Box;
export const CardTitle = Text;
export const CardValue = Text;
export const LastUsersCard = Box;
export const LastUsersTitle = Text;
export const UserRow = Box;
export const Avatar = Box;
export const UserInfo = Box;
export const UserName = Text;
export const UserEmail = Text;
export const UserBadge = Box;

export const containerStyles = { maxW: "1200px" };
export const headingStyles = { size: "xl" as const, fontWeight: "bold", color: "var(--color-text)", mb: 1 };
export const subtitleStyles = { fontSize: "sm", color: "var(--color-muted)", mb: 6 };
export const statsGridStyles = {
  display: "grid",
  gridTemplateColumns: { base: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
  gap: { base: 3, md: 4 },
  mb: 6,
};
export const statCardStyles = {
  bg: "var(--color-bg-surface)",
  borderRadius: "lg",
  p: 5,
  boxShadow: "sm",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 4,
};
export const statCardContentStyles = { minW: 0 };
export const statCardTitleStyles = {
  fontSize: "xs",
  color: "var(--color-muted)",
  mb: 1,
  textTransform: "uppercase" as const,
  letterSpacing: "wider",
  fontWeight: "medium",
};
export const statCardValueStyles = { fontSize: "2xl", fontWeight: "bold", color: "var(--color-text)" };
export const statCardIconBoxStyles = {
  w: 12,
  h: 12,
  borderRadius: "lg",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "white",
};
export const lastUsersCardStyles = {
  bg: "var(--color-bg-surface)",
  borderRadius: "lg",
  p: 5,
  boxShadow: "sm",
};
export const lastUsersTitleStyles = { fontWeight: "bold", fontSize: "lg", color: "var(--color-text)", mb: 4 };
export const userRowStyles = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  py: 3,
  borderBottomWidth: "1px",
  borderBottomColor: "var(--color-bg-page)",
  _last: { borderBottomWidth: 0 },
};
export const avatarStyles = {
  w: 10,
  h: 10,
  borderRadius: "full",
  background: "var(--gradient-primary)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "md",
  flexShrink: 0,
};
export const userInfoStyles = { flex: 1, minW: 0 };
export const userNameStyles = { fontWeight: "bold", color: "var(--color-text)" };
export const userEmailStyles = { fontSize: "sm", color: "var(--color-muted)" };
export const userBadgeStyles = {
  px: 3,
  py: 1,
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "medium",
};
export const userBadgeAdminStyles = {
  ...userBadgeStyles,
  bg: "var(--color-primary)",
  color: "var(--color-primary-text)",
};
export const userBadgeUserStyles = {
  ...userBadgeStyles,
  bg: "var(--color-row-hover)",
  color: "var(--color-muted)",
};
