import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useUser, useUpdateUser } from "../../hooks/useUsersQuery";
import type { UpdateUserRequest, UserType } from "../../types/api.types";
import { getDisplayErrorForToast } from "../../utils/apiError";
import { toaster } from "../ui/toaster";
import { ChevronDownIcon, CheckIcon } from "../icons";
import { PasswordInput } from "../PasswordInput";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
};

const TIPO_VALUES: UserType[] = ["user", "admin"];

export function EditUserModal({ isOpen, onClose, userId }: EditUserModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<UserType>("user");
  const [password, setPassword] = useState("");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setTypeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: user, isLoading } = useUser(userId ?? undefined);
  const updateUser = useUpdateUser(userId ?? "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setType(user.type);
      setPassword("");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const payload: UpdateUserRequest = { name, email, type };
    if (password.trim()) payload.password = password.trim();
    updateUser.mutate(payload, {
      onSuccess: () => {
        toaster.create({ type: "success", title: t("toast.userUpdated") });
        onClose();
      },
      onError: (err) => {
        toaster.create({
          type: "error",
          title: getDisplayErrorForToast(err, t),
        });
      },
    });
  };

  if (!isOpen) return null;

  const inputStyles = {
    borderColor: "var(--color-input)",
    borderRadius: "md",
    bg: "var(--color-bg-surface)",
    px: 3,
    py: 2,
    _focus: { borderColor: "var(--color-input)", boxShadow: "none", outline: "none" },
    _focusVisible: { borderColor: "var(--color-input)", boxShadow: "none", outline: "none" },
  };


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
        maxW="md"
        w="100%"
        maxHeight="calc(100vh - 2rem)"
        overflowY="auto"
        overflowX="hidden"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onTouchStart={(e: React.TouchEvent) => e.stopPropagation()}
        my="auto"
      >
        <Box position="relative" px={6} pt={5} pb={2} flexShrink={0}>
          <Text fontSize="lg" fontWeight="bold" color="var(--color-text)">
            {t("editUser.title")}
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
        <Box px={6} py={6} pb={6} flexShrink={0}>
          {isLoading ? (
            <Text color="var(--color-muted)">{t("common.loading")}</Text>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box mb={5}>
                <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="var(--color-text)">
                  {t("common.name")}
                </Text>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("userEdit.namePlaceholder")}
                  required
                  h="40px"
                  {...inputStyles}
                />
              </Box>
              <Box mb={5}>
                <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="var(--color-text)">
                  {t("common.email")}
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("userEdit.emailPlaceholder")}
                  required
                  h="40px"
                  {...inputStyles}
                />
              </Box>
              <Box mb={5} ref={typeDropdownRef} position="relative">
                <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="var(--color-text)">
                  Tipo
                </Text>
                <Button
                  type="button"
                  variant="outline"
                  position="relative"
                  w="100%"
                  h="40px"
                  px={3}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="var(--color-border)"
                  bg="var(--color-bg-surface)"
                  color="var(--color-text)"
                  fontSize="sm"
                  justifyContent="flex-start"
                  fontWeight="normal"
                  _hover={{ borderColor: "var(--color-muted)", bg: "var(--color-bg-surface)" }}
                  _focus={{ borderColor: "var(--color-border)", boxShadow: "none", bg: "var(--color-bg-surface)" }}
                  onClick={() => setTypeDropdownOpen((v) => !v)}
                >
                  <span style={{ paddingRight: 28 }}>
                    {type === "admin" ? t("common.userTypeAdmin") : t("common.userTypeUser")}
                  </span>
                  <Box
                    position="absolute"
                    right={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="var(--color-muted)"
                    pointerEvents="none"
                  >
                    <ChevronDownIcon size={18} />
                  </Box>
                </Button>
                {typeDropdownOpen && (
                  <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    mt={1}
                    p={2}
                    bg="var(--color-bg-surface)"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="var(--color-border)"
                    boxShadow="lg"
                    zIndex={10}
                    overflow="hidden"
                  >
                    {TIPO_VALUES.map((opt) => (
                      <Button
                        key={opt}
                        type="button"
                        variant="ghost"
                        w="100%"
                        px={4}
                        py={2.5}
                        justifyContent="flex-start"
                        alignItems="center"
                        gap={2}
                        fontSize="sm"
                        fontWeight="normal"
                        color={type === opt ? "var(--color-primary)" : "var(--color-text)"}
                        bg="transparent"
                        _hover={{ bg: "var(--color-primary)", color: "var(--color-primary-text)" }}
                        borderRadius="md"
                        onClick={() => {
                          setType(opt);
                          setTypeDropdownOpen(false);
                        }}
                      >
                        <Box w={5} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                          {type === opt ? <CheckIcon size={18} /> : <Box w={18} h={18} />}
                        </Box>
                        {opt === "admin" ? t("common.userTypeAdmin") : t("common.userTypeUser")}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
              <Box mb={6}>
                <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="var(--color-text)">
                  {t("common.password")} <Text as="span" color="var(--color-muted)" fontWeight="normal">{t("editUser.passwordHint")}</Text>
                </Text>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("userEdit.passwordPlaceholder")}
                  h="40px"
                  {...inputStyles}
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
                  type="submit"
                  size="sm"
                  borderRadius="md"
                  h="40px"
                  px={5}
                  fontWeight="medium"
                  background="var(--gradient-primary)"
                  color="var(--color-primary-text)"
                  border="none"
                  _hover={{ opacity: 0.9 }}
                  disabled={updateUser.isPending}
                >
                  {updateUser.isPending ? t("editUser.saving") : t("common.save")}
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
}
