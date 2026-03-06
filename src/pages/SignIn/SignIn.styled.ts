import { Box, Text, Input, Button, InputGroup } from "@chakra-ui/react";

export const PageContainer = Box;
export const SplitRow = Box;
export const LeftPanel = Box;
export const RightPanel = Box;
export const InputGroupStyled = InputGroup;
export const LogoIcon = Box;
export const BrandTitle = Text;
export const BrandSubtitle = Text;
export const BrandDescription = Text;
export const Copyright = Text;
export const FormCard = Box;
export const WelcomeTitle = Text;
export const WelcomeSubtitle = Text;
export const CardTitle = Text;
export const CardSubtitle = Text;
export const FormField = Box;
export const FieldLabel = Text;
export const FieldInput = Input;
export const SubmitButton = Button;
export const TestCredentialsBlock = Box;
export const TestCredentialsTitle = Text;
export const TestCredentialsRow = Text;

export const pageStyles = {
  position: "relative" as const,
  m: 0,
  w: "100%",
  minH: "100vh",
  bg: "var(--color-bg-page)",
  display: "flex",
  flexDirection: "column" as const,
  overflow: "hidden",
};

export const splitRowStyles = {
  flex: 1,
  display: "flex",
  flexDirection: { base: "column" as const, lg: "row" as const },
  minH: "100vh",
  w: "100%",
};

export const leftPanelStyles = {
  display: { base: "none" as const, lg: "flex" as const },
  flex: "1 1 50%",
  minH: "100vh",
  background: "var(--gradient-primary)",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  p: { lg: 10, xl: 12 },
  py: 10,
};

export const leftPanelTopStyles = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  flexShrink: 0,
};

export const leftPanelCenterStyles = {
  flex: 1,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column" as const,
  textAlign: "left" as const,
  py: { base: 6, md: 8 },
  w: "100%",
};

export const rightPanelStyles = {
  flex: { base: "1 1 auto", lg: "1 1 50%" },
  minH: "100vh",
  w: "100%",
  maxW: "100%",
  bg: "var(--color-bg-page)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  p: { base: 4, sm: 6, md: 8, lg: 10, xl: 14 },
};

export const logoStyles = {
  w: 8,
  h: 8,
  borderRadius: "md",
  bg: "rgba(255,255,255,0.2)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const brandTitleStyles = {
  fontWeight: "bold",
  fontSize: { base: "0.75rem", md: "1.2rem" },
  color: "white",
};

export const brandSubtitleStyles = {
  fontSize: { base: "1.5rem", md: "2.25rem", lg: "2.5rem" },
  color: "white",
  fontWeight: "bold",
  lineHeight: 1.15,
  maxW: "320px",
  display: "block",
};

export const brandDescriptionStyles = {
  fontSize: { base: "0.7rem", md: "0.95rem" },
  color: "rgba(255,255,255,0.88)",
  fontWeight: "300",
  lineHeight: 1.5,
  maxW: "360px",
  mt: 6,
  display: "block",
};

export const copyrightStyles = {
  fontSize: "xs",
  color: "rgba(255,255,255,0.7)",
  mt: 6,
};

export const formCardStyles = {
  w: "100%",
  maxW: { base: "100%", sm: "400px" },
};

export const welcomeTitleStyles = {
  fontWeight: "bold",
  fontSize: { base: "2xl", md: "3xl" },
  color: "var(--color-text)",
  mb: 2,
};

export const welcomeSubtitleStyles = {
  fontSize: "sm",
  color: "var(--color-muted)",
  mb: 8,
};

export const fieldStyles = { mb: 4 };
export const labelStyles = {
  display: "block",
  mb: 2,
  fontSize: "sm",
  fontWeight: "medium",
  color: "var(--color-muted)",
};
export const inputStyles = {
  bg: "var(--color-bg-surface)",
  borderRadius: "md",
  color: "var(--color-text)",
  borderWidth: "1px",
  borderColor: "var(--color-input)",
  minHeight: "40px",
  height: "40px",
  _placeholder: { color: "var(--color-placeholder)" },
  _focus: {
    borderColor: "var(--color-input)",
    boxShadow: "none",
    outline: "none",
  },
  _focusVisible: {
    borderColor: "var(--color-input)",
    boxShadow: "none",
    outline: "none",
  },
};
export const buttonStyles = {
  w: "100%",
  background: "var(--gradient-primary)",
  color: "var(--color-primary-text)",
  mt: 2,
  cursor: "pointer",
  border: "none",
  fontWeight: "medium",
  py: 3,
  borderRadius: "md",
  _hover: { opacity: 0.9 },
};
export const ErrorMessage = Text;
export const errorMessageStyles = {
  mt: 2,
  fontSize: "sm",
  color: "var(--color-destructive)",
};

export const testCredentialsBlockStyles = {
  mt: 8,
  pt: 6,
  borderTopWidth: "1px",
  borderTopColor: "var(--color-border)",
  w: "100%",
  maxW: "400px",
};

export const testCredentialsTitleStyles = {
  fontSize: "sm",
  fontWeight: "medium",
  color: "var(--color-muted)",
  mb: 2,
};

export const testCredentialsRowStyles = {
  fontSize: "sm",
  color: "var(--color-text)",
  fontFamily: "mono",
};
