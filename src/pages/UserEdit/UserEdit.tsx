import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUser, useUpdateUser } from "../../hooks/useUsersQuery";
import type { UpdateUserRequest, UserType } from "../../types/api.types";
import { getDisplayErrorForToast } from "../../utils/apiError";
import { toaster } from "../../components/ui/toaster";
import { PasswordInput } from "../../components/PasswordInput";
import {
  PageContainer,
  FormTitle,
  FormField,
  FieldLabel,
  FieldInput,
  SubmitButton,
  BackLinkStyled,
  containerStyles,
  formTitleStyles,
  fieldStyles,
  labelStyles,
  buttonStyles,
  backLinkStyles,
} from "./UserEdit.styled";

function UserEdit() {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<UserType>("user");
  const [password, setPassword] = useState("");

  const { data: user, isLoading, isError, error } = useUser(userId);
  const updateUser = useUpdateUser(userId ?? "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setType(user.type);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const payload: UpdateUserRequest = { name, email, type };
    if (password.trim()) payload.password = password.trim();
    updateUser.mutate(payload, {
      onSuccess: () => navigate("/users", { replace: true }),
      onError: (err) => {
        toaster.create({
          type: "error",
          title: getDisplayErrorForToast(err, t),
        });
      },
    });
  };

  const hasShownLoadError = useRef(false);
  useEffect(() => {
    if (isError && error && !hasShownLoadError.current) {
      hasShownLoadError.current = true;
      toaster.create({
        type: "error",
        title: getDisplayErrorForToast(error, t),
      });
    }
  }, [isError, error, t]);

  if (isLoading) return <PageContainer {...containerStyles}>{t("common.loading")}</PageContainer>;
  if (isError || (userId && !user)) {
    return (
      <PageContainer {...containerStyles}>
        <BackLinkStyled asChild {...backLinkStyles}>
          <Link to="/users">{t("userEdit.backToUsers")}</Link>
        </BackLinkStyled>
        <p style={{ color: "var(--color-muted)", marginTop: 8 }}>{t("userEdit.notFound")}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer {...containerStyles}>
      <BackLinkStyled asChild {...backLinkStyles}>
        <Link to="/users">{t("userEdit.backToUsers")}</Link>
      </BackLinkStyled>
      <FormTitle {...formTitleStyles}>{t("userEdit.formTitle")}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userEdit.nameLabel")}</FieldLabel>
          <FieldInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userEdit.emailLabel")}</FieldLabel>
          <FieldInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userEdit.typeLabel")}</FieldLabel>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as UserType)}
            style={{ padding: 8, borderRadius: 6, minWidth: 120 }}
          >
            <option value="user">{t("common.userTypeUser")}</option>
            <option value="admin">{t("common.userTypeAdmin")}</option>
          </select>
        </FormField>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userEdit.passwordLabel")}</FieldLabel>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("userEdit.passwordPlaceholder")}
          />
        </FormField>
        <SubmitButton {...buttonStyles} disabled={updateUser.isPending}>
          {updateUser.isPending ? t("userEdit.saving") : t("userEdit.submit")}
        </SubmitButton>
      </form>
    </PageContainer>
  );
}

export default UserEdit;
