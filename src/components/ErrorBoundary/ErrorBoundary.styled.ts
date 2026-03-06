import { Box, Heading, Text, Button } from "@chakra-ui/react";

export const Container = Box;
export const ErrorHeading = Heading;
export const ErrorText = Text;
export const BackButton = Button;

export const containerStyles = { p: 8, textAlign: "center" as const };
export const headingStyles = { size: "lg" as const, mb: 4, color: "var(--color-destructive)" };
export const textStyles = { mb: 6 };
