import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Input, Button } from "@chakra-ui/react";
import { EyeIcon, EyeOffIcon } from "../icons";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type"
> & {
  startElement?: React.ReactNode;
};

export function PasswordInput({
  startElement,
  ...inputProps
}: PasswordInputProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const hasStart = !!startElement;
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="stretch"
      w="100%"
      {...(hasStart && {
        borderWidth: "1px",
        borderColor: "var(--color-border)",
        borderRadius: "md",
        bg: inputProps.bg ?? "var(--color-bg-surface)",
        overflow: "hidden",
      })}
    >
      {startElement && (
        <Box
          pl={3}
          pr={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="var(--color-input)"
          bg="var(--color-bg-surface)"
          pointerEvents="none"
        >
          {startElement}
        </Box>
      )}
      <Input
        type={showPassword ? "text" : "password"}
        pr="10"
        flex="1"
        minW={0}
        {...(hasStart && { border: "none", borderWidth: 0 })}
        {...inputProps}
      />
      <Button
        type="button"
        position="absolute"
        right={1}
        top="50%"
        transform="translateY(-50%)"
        variant="ghost"
        size="sm"
        minW={8}
        minH={8}
        p={0}
        color="var(--color-input)"
        _hover={{ color: "var(--color-text)", bg: "var(--color-bg-page)" }}
        onClick={() => setShowPassword((v) => !v)}
        aria-label={showPassword ? t("common.hidePassword") : t("common.showPassword")}
      >
        {showPassword ? (
          <EyeOffIcon size={20} />
        ) : (
          <EyeIcon size={20} />
        )}
      </Button>
    </Box>
  );
}
