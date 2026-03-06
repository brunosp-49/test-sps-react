import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser } from "../../hooks/useUsersQuery";
import type { UserType } from "../../types/api.types";
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
} from "./UserCreate.styled";

function UserCreate() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<UserType>("user");
  const [password, setPassword] = useState("");

  const createUser = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser.mutate(
      { name, email, type, password },
      {
        onSuccess: () => navigate("/users", { replace: true }),
        onError: (err) => {
          toaster.create({
            type: "error",
            title: getDisplayErrorForToast(err, t),
          });
        },
      }
    );
  };

  return (
    <PageContainer {...containerStyles}>
      <BackLinkStyled asChild {...backLinkStyles}>
        <Link to="/users">{t("userCreate.backToUsers")}</Link>
      </BackLinkStyled>
      <FormTitle {...formTitleStyles}>{t("userCreate.formTitle")}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userCreate.nameLabel")}</FieldLabel>
          <FieldInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userCreate.emailLabel")}</FieldLabel>
          <FieldInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userCreate.typeLabel")}</FieldLabel>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as UserType)}
            style={{ padding: "8px 12px", borderRadius: 6, minWidth: 140 }}
          >
            <option value="user">{t("common.userTypeUser")}</option>
            <option value="admin">{t("common.userTypeAdmin")}</option>
          </select>
        </FormField>
        <FormField {...fieldStyles}>
          <FieldLabel {...labelStyles}>{t("userCreate.passwordLabel")}</FieldLabel>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormField>
        <SubmitButton {...buttonStyles} disabled={createUser.isPending}>
          {createUser.isPending ? t("userCreate.submitting") : t("userCreate.submit")}
        </SubmitButton>
      </form>
    </PageContainer>
  );
}

export default UserCreate;
