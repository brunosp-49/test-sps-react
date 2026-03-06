import { Box, Text, Input, Button, Link } from "@chakra-ui/react";

export const PageContainer = Box;
export const FormTitle = Text;
export const FormField = Box;
export const FieldLabel = Text;
export const FieldInput = Input;
export const SubmitButton = Button;
export const BackLinkStyled = Link;

export const containerStyles = { p: 8 };
export const formTitleStyles = { mb: 4 };
export const fieldStyles = { mb: 4 };
export const labelStyles = { as: "label" as const, display: "block", mb: 2 };
export const buttonStyles = {
  type: "submit" as const,
  bg: "var(--color-primary)",
  color: "var(--color-primary-text)",
  _hover: { opacity: 0.9 },
};
export const backLinkStyles = { color: "var(--color-accent)", mb: 4, display: "inline-block", _hover: { textDecoration: "underline" } };
