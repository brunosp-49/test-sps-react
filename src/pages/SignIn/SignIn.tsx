import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@chakra-ui/react";
import {
  EnvelopeIcon,
  LockIcon,
  MoonIcon,
  SunIcon,
} from "../../components/icons";
import { PasswordInput } from "../../components/PasswordInput";
import { LanguageSelector } from "../../components/LanguageSelector/LanguageSelector";
import { toaster } from "../../components/ui/toaster";
import { useAppDispatch } from "../../store";
import { useTheme } from "../../theme/ThemeContext";
import {
  loginThunk,
  selectAuthError,
  selectAuthStatus,
} from "../../store/authSlice";
import {
  PageContainer,
  SplitRow,
  LeftPanel,
  RightPanel,
  LogoIcon,
  BrandTitle,
  BrandSubtitle,
  BrandDescription,
  Copyright,
  FormCard,
  WelcomeTitle,
  WelcomeSubtitle,
  FormField,
  FieldLabel,
  FieldInput,
  SubmitButton,
  pageStyles,
  splitRowStyles,
  leftPanelStyles,
  leftPanelTopStyles,
  leftPanelCenterStyles,
  rightPanelStyles,
  logoStyles,
  brandTitleStyles,
  brandSubtitleStyles,
  brandDescriptionStyles,
  copyrightStyles,
  formCardStyles,
  welcomeTitleStyles,
  welcomeSubtitleStyles,
  fieldStyles,
  labelStyles,
  inputStyles,
  buttonStyles,
} from "./SignIn.styled";

function SignIn() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const { mode, toggle } = useTheme();
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    "/users";

  useEffect(() => {
    if (status === "error" && error) {
      toaster.create({
        type: "error",
        title: error.startsWith("error.") ? t(error) : t("error.generic"),
      });
    }
  }, [status, error, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        toaster.create({ type: "success", title: t("toast.loginSuccess") });
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  return (
    <PageContainer {...pageStyles}>
      <Box
        position="absolute"
        top={4}
        right={4}
        zIndex={10}
        display="flex"
        alignItems="center"
        gap={3}
      >
        <LanguageSelector />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggle}
          aria-label={
            mode === "light"
              ? t("common.themeDarkAria")
              : t("common.themeLightAria")
          }
          color={mode === "light" ? "var(--color-muted)" : "var(--color-muted)"}
          _hover={{ color: "var(--color-text)", bg: "var(--color-bg-page)" }}
          display="inline-flex"
          alignItems="center"
          gap={2}
          px={4}
          py={2.5}
          minH="40px"
          borderRadius="md"
          bg="var(--color-bg-surface)"
          borderWidth="1px"
          borderColor="var(--color-border)"
        >
          {mode === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          {mode === "light" ? t("common.themeDark") : t("common.themeLight")}
        </Button>
      </Box>

      <SplitRow {...splitRowStyles}>
        <LeftPanel {...leftPanelStyles}>
          <Box {...leftPanelTopStyles}>
            <LogoIcon {...logoStyles} color="white">
              <LockIcon size={18} />
            </LogoIcon>
            <BrandTitle {...brandTitleStyles}>{t("common.appName")}</BrandTitle>
          </Box>
          <Box {...leftPanelCenterStyles}>
            <BrandSubtitle {...brandSubtitleStyles}>
              {t("signIn.brandSubtitle")}
            </BrandSubtitle>
            <BrandDescription {...brandDescriptionStyles} as="p">
              {t("signIn.brandDescription")}
            </BrandDescription>
          </Box>
          <Copyright {...copyrightStyles}>{t("signIn.copyright")}</Copyright>
        </LeftPanel>

        <RightPanel {...rightPanelStyles}>
          <FormCard {...formCardStyles}>
            <WelcomeTitle {...welcomeTitleStyles}>
              {t("signIn.welcomeTitle")}
            </WelcomeTitle>
            <WelcomeSubtitle {...welcomeSubtitleStyles}>
              {t("signIn.welcomeSubtitle")}
            </WelcomeSubtitle>

            <form onSubmit={handleSubmit}>
              <FormField {...fieldStyles}>
                <FieldLabel {...labelStyles}>{t("common.email")}</FieldLabel>
                <Box
                  display="flex"
                  alignItems="stretch"
                  w="100%"
                  borderWidth="1px"
                  borderColor="var(--color-border)"
                  borderRadius="md"
                  bg="var(--color-bg-surface)"
                  overflow="hidden"
                >
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
                    <EnvelopeIcon />
                  </Box>
                  <FieldInput
                    type="email"
                    placeholder={t("signIn.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    flex="1"
                    minW={0}
                    {...inputStyles}
                    border="none"
                    borderWidth={0}
                  />
                </Box>
              </FormField>
              <FormField {...fieldStyles}>
                <FieldLabel {...labelStyles}>{t("common.password")}</FieldLabel>
                <PasswordInput
                  startElement={<LockIcon />}
                  placeholder={t("signIn.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  {...inputStyles}
                />
              </FormField>
              <SubmitButton
                type="submit"
                {...buttonStyles}
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? t("signIn.submitting")
                  : t("signIn.submit")}
              </SubmitButton>
            </form>
          </FormCard>
        </RightPanel>
      </SplitRow>
    </PageContainer>
  );
}

export default SignIn;
