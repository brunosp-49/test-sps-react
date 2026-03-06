import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Text, Button, Input } from "@chakra-ui/react";

type DeleteUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm: () => void;
  isDeleting: boolean;
};

export function DeleteUserModal({
  isOpen,
  onClose,
  userName,
  onConfirm,
  isDeleting,
}: DeleteUserModalProps) {
  const { t } = useTranslation();
  const [confirmText, setConfirmText] = useState("");
  const confirmWord = t("deleteUser.confirmWord");

  useEffect(() => {
    if (isOpen) setConfirmText("");
  }, [isOpen, confirmWord]);

  const canConfirm = confirmText.trim().toLowerCase() === confirmWord.toLowerCase();

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={100}
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      onClick={onClose}
      overflow="auto"
    >
      <Box
        bg="var(--color-bg-surface)"
        borderRadius="xl"
        boxShadow="xl"
        maxW="sm"
        w="100%"
        maxHeight="calc(100vh - 2rem)"
        overflowY="auto"
        overflowX="hidden"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onTouchStart={(e: React.TouchEvent) => e.stopPropagation()}
        my="auto"
      >
        <Box position="relative" px={6} pt={5} pb={2}>
          <Text fontSize="lg" fontWeight="bold" color="var(--color-text)">
            {t("deleteUser.title")}
          </Text>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label={t("common.close")}
            position="absolute"
            top={3}
            right={4}
            fontSize="lg"
            color="var(--color-muted)"
            _hover={{ color: "var(--color-text)", bg: "var(--color-bg-page)" }}
            minW={8}
            minH={8}
            p={0}
            borderRadius="md"
          >
            ×
          </Button>
        </Box>
        <Box px={6} py={6} pb={6}>
          <Text color="var(--color-text)" mb={4}>
            {t("deleteUser.message", { name: userName })}
          </Text>
          <Box mb={5}>
            <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="var(--color-text)">
              {t("deleteUser.confirmPromptBefore")} <strong>{confirmWord}</strong> {t("deleteUser.confirmPromptAfter")}
            </Text>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={confirmWord}
              borderColor="var(--color-border)"
              borderRadius="md"
              bg="var(--color-bg-surface)"
              h="40px"
              px={3}
              py={2}
              _focus={{ borderColor: "var(--color-border)", boxShadow: "none", outline: "none" }}
              _focusVisible={{ borderColor: "var(--color-border)", boxShadow: "none", outline: "none" }}
              _placeholder={{ color: "var(--color-muted)" }}
            />
          </Box>
          <Box display="flex" gap={3} justifyContent="flex-end" mt={2}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              borderRadius="md"
              borderWidth="1px"
              borderColor="var(--color-border)"
              bg="var(--color-bg-surface)"
              color="var(--color-text)"
              fontWeight="medium"
              h="40px"
              px={5}
              onClick={onClose}
              _hover={{ bg: "var(--color-bg-page)", borderColor: "var(--color-border)" }}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="button"
              size="sm"
              borderRadius="md"
              h="40px"
              px={5}
              fontWeight="medium"
              bg="var(--color-destructive)"
              color="white"
              _hover={{ opacity: 0.9 }}
              onClick={onConfirm}
              disabled={!canConfirm || isDeleting}
            >
              {isDeleting ? t("deleteUser.deleting") : t("deleteUser.delete")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
