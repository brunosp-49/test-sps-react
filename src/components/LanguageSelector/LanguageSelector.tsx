import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const FLAG_BASE =
  "https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg";
const LANGUAGES = [
  { code: "pt", flag: `${FLAG_BASE}/br.svg` },
  { code: "es", flag: `${FLAG_BASE}/es.svg` },
  { code: "en", flag: `${FLAG_BASE}/us.svg` },
] as const;

type LanguageSelectorProps = {
  size?: "sm" | "md";
  compact?: boolean;
};

const flagSizePx = (compact: boolean, size: string) => {
  if (compact) return "24px";
  return size === "sm" ? "28px" : "32px";
};

export function LanguageSelector({
  size = "sm",
  compact = false,
}: LanguageSelectorProps) {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.split("-")[0] || "pt";
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const sizePx = flagSizePx(compact, size);
  const currentFlag = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  return (
    <Box ref={containerRef} position="relative" display="inline-block">
      <Button
        type="button"
        variant="ghost"
        p={0}
        w={sizePx}
        h={sizePx}
        minW={sizePx}
        minH={sizePx}
        onClick={() => setOpen((v) => !v)}
        aria-label={t("common.language")}
        aria-expanded={open}
        aria-haspopup="listbox"
        bg="transparent"
        _hover={{ bg: "var(--color-bg-page)" }}
        _active={{ bg: "var(--color-bg-page)" }}
        borderRadius="full"
        overflow="hidden"
        display="block"
        borderWidth="2px"
        borderColor={open ? "var(--color-primary)" : "transparent"}
        transition="border-color 0.15s ease, box-shadow 0.15s ease"
        transform="none"
        _focusVisible={{
          outline: "none",
          borderColor: "var(--color-primary)",
          boxShadow: "0 0 0 2px var(--color-primary)",
        }}
      >
        <img
          src={currentFlag.flag}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            verticalAlign: "top",
          }}
        />
      </Button>
      {open && (
        <Box
          role="listbox"
          position="absolute"
          top="100%"
          left={0}
          mt={1.5}
          p={1.5}
          bg="var(--color-bg-surface)"
          borderRadius="md"
          borderWidth="1px"
          borderColor="var(--color-border)"
          boxShadow="0 4px 12px rgba(0,0,0,0.1)"
          zIndex={50}
          display="flex"
          gap={1.5}
          alignItems="center"
        >
          {LANGUAGES.map(({ code, flag }) => (
            <Button
              key={code}
              role="option"
              aria-selected={current === code}
              type="button"
              variant="ghost"
              p={0}
              w={sizePx}
              h={sizePx}
              minW={sizePx}
              minH={sizePx}
              onClick={() => {
                i18n.changeLanguage(code);
                setOpen(false);
              }}
              aria-label={
                code === "pt"
                  ? t("lang.portuguese")
                  : code === "es"
                  ? t("lang.spanish")
                  : t("lang.english")
              }
              borderRadius="full"
              overflow="hidden"
              display="block"
              bg={current === code ? "var(--color-bg-page)" : "transparent"}
              borderWidth="2px"
              borderColor={
                current === code ? "var(--color-primary)" : "transparent"
              }
              _hover={{ bg: "var(--color-bg-page)" }}
              transition="background-color 0.15s ease, border-color 0.15s ease"
            >
              <img
                src={flag}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  verticalAlign: "top",
                }}
              />
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
