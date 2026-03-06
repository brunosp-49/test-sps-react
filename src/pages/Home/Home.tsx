import React from "react";
import { useTranslation } from "react-i18next";
import { useUserList } from "../../hooks/useUsersQuery";
import type { User } from "../../types/api.types";
import { UsersIcon, ShieldIcon, ActivityIcon } from "../../components/icons";
import {
  PageContainer,
  PageHeading,
  PageSubtitle,
  StatsGrid,
  StatCard,
  CardTitle,
  CardValue,
  LastUsersCard,
  LastUsersTitle,
  UserRow,
  Avatar,
  UserInfo,
  UserName,
  UserEmail,
  UserBadge,
  containerStyles,
  headingStyles,
  subtitleStyles,
  statsGridStyles,
  statCardStyles,
  statCardContentStyles,
  statCardTitleStyles,
  statCardValueStyles,
  statCardIconBoxStyles,
  lastUsersCardStyles,
  lastUsersTitleStyles,
  userRowStyles,
  avatarStyles,
  userInfoStyles,
  userNameStyles,
  userEmailStyles,
  userBadgeAdminStyles,
  userBadgeUserStyles,
} from "./Home.styled";

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

function Home() {
  const { t } = useTranslation();
  const { data: users = [], isLoading, isError } = useUserList();

  const total = users.length;
  const admins = users.filter((u) => u.type === "admin").length;
  const commonUsers = users.filter((u) => u.type === "user").length;
  const lastUsers = users.slice(0, 5);

  if (isLoading) {
    return (
      <PageContainer {...containerStyles}>
        <PageHeading {...headingStyles}>{t("home.title")}</PageHeading>
        <PageSubtitle {...subtitleStyles}>{t("common.loading")}</PageSubtitle>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer {...containerStyles}>
        <PageHeading {...headingStyles}>{t("home.title")}</PageHeading>
        <PageSubtitle {...subtitleStyles}>
          {t("home.subtitle")}
        </PageSubtitle>
        <p style={{ color: "var(--color-muted)" }}>
          {t("home.loadError")}
        </p>
      </PageContainer>
    );
  }

  return (
    <PageContainer {...containerStyles}>
      <PageHeading {...headingStyles}>{t("home.title")}</PageHeading>
      <PageSubtitle {...subtitleStyles}>{t("home.subtitle")}</PageSubtitle>

      <StatsGrid {...statsGridStyles}>
        <StatCard {...statCardStyles}>
          <Box {...statCardContentStyles}>
            <CardTitle {...statCardTitleStyles}>{t("home.totalUsers")}</CardTitle>
            <CardValue {...statCardValueStyles}>{total}</CardValue>
          </Box>
          <Box {...statCardIconBoxStyles} background="var(--gradient-primary)">
            <UsersIcon size={24} />
          </Box>
        </StatCard>
        <StatCard {...statCardStyles}>
          <Box {...statCardContentStyles}>
            <CardTitle {...statCardTitleStyles}>{t("home.administrators")}</CardTitle>
            <CardValue {...statCardValueStyles}>{admins}</CardValue>
          </Box>
          <Box {...statCardIconBoxStyles} background="var(--gradient-sidebar-active)">
            <ShieldIcon size={24} />
          </Box>
        </StatCard>
        <StatCard {...statCardStyles}>
          <Box {...statCardContentStyles}>
            <CardTitle {...statCardTitleStyles}>{t("home.commonUsers")}</CardTitle>
            <CardValue {...statCardValueStyles}>{commonUsers}</CardValue>
          </Box>
          <Box {...statCardIconBoxStyles} background="var(--gradient-primary)">
            <UsersIcon size={24} />
          </Box>
        </StatCard>
        <StatCard {...statCardStyles}>
          <Box {...statCardContentStyles}>
            <CardTitle {...statCardTitleStyles}>{t("home.systemActive")}</CardTitle>
            <CardValue {...statCardValueStyles}>{t("home.online")}</CardValue>
          </Box>
          <Box {...statCardIconBoxStyles} background="var(--gradient-sidebar-active)">
            <ActivityIcon size={24} />
          </Box>
        </StatCard>
      </StatsGrid>

      <LastUsersCard {...lastUsersCardStyles}>
        <LastUsersTitle {...lastUsersTitleStyles}>
          {t("home.lastUsers")}
        </LastUsersTitle>
        {lastUsers.length === 0 ? (
          <CardTitle as="p" color="var(--color-muted)">
            {t("home.noUsers")}
          </CardTitle>
        ) : (
          lastUsers.map((user: User) => (
            <UserRow key={user.id} {...userRowStyles}>
              <Avatar {...avatarStyles}>{getInitial(user.name)}</Avatar>
              <UserInfo {...userInfoStyles}>
                <UserName {...userNameStyles}>{user.name}</UserName>
                <UserEmail {...userEmailStyles}>{user.email}</UserEmail>
              </UserInfo>
              <UserBadge {...(user.type === "admin" ? userBadgeAdminStyles : userBadgeUserStyles)}>
                {user.type === "admin" ? t("common.userTypeAdmin") : t("common.userTypeUser")}
              </UserBadge>
            </UserRow>
          ))
        )}
      </LastUsersCard>
    </PageContainer>
  );
}

const Box = PageContainer;

export default Home;
