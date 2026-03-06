import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Input } from "@chakra-ui/react";
import { useUserList, useDeleteUser } from "../../hooks/useUsersQuery";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- used in deleteUser.mutate onSuccess callback
import { toaster } from "../../components/ui/toaster";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout, selectUser } from "../../store/authSlice";
import { getDisplayErrorForToast } from "../../utils/apiError";
import { EditUserModal } from "../../components/EditUserModal";
import { DeleteUserModal } from "../../components/DeleteUserModal";
import { CreateUserModal } from "../../components/CreateUserModal/CreateUserModal";
import {
  PlusIcon,
  RefreshIcon,
  SearchIcon,
  PencilIcon,
  TrashIcon,
} from "../../components/icons";
import {
  PageContainer,
  PageHeading,
  PageSubtitle,
  ActionButton,
  TableCard,
  TypeBadge,
  containerStyles,
  headerRowStyles,
  headingStyles,
  subtitleStyles,
  toolbarStyles,
  searchBarWrapperStyles,
  searchInputStyles,
  searchIconWrapperStyles,
  tableHeaderStyles,
  tableCellStyles,
  nameCellContentStyles,
  userAvatarStyles,
  refreshButtonStyles,
  newUserButtonStyles,
  tableCardStyles,
  pillAdminStyles,
  pillUserStyles,
  iconButtonStyles,
  deleteIconButtonStyles,
  mobileUserListStyles,
  mobileUserCardStyles,
  mobileUserCardMainStyles,
  mobileUserCardMetaStyles,
  mobileUserCardActionsStyles,
} from "./Users.styled";

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

function Users() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useUserList();
  const deleteUser = useDeleteUser();
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteUserTarget, setDeleteUserTarget] = useState<{ id: string; name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.trim().toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const handleConfirmDelete = () => {
    if (!deleteUserTarget) return;
    const deletedId = deleteUserTarget.id;
    const isDeletingSelf = currentUser?.id === deletedId;
    if (isDeletingSelf) {
      dispatch(logout());
      navigate("/signin", { replace: true });
    }
    deleteUser.mutate(deletedId, {
      onSuccess: () => {
        toaster.create({ type: "success", title: t("toast.userDeleted") });
      },
      onError: (err) => {
        toaster.create({
          type: "error",
          title: getDisplayErrorForToast(err, t),
        });
      },
      onSettled: () => setDeleteUserTarget(null),
    });
  };

  const isDeletingId = deleteUser.isPending ? deleteUser.variables : null;

  useEffect(() => {
    if (isError && error) {
      toaster.create({
        type: "error",
        title: getDisplayErrorForToast(error, t),
      });
    }
  }, [isError, error, t]);

  if (isLoading) {
    return (
      <PageContainer {...containerStyles}>
        {t("common.loading")}
      </PageContainer>
    );
  }

  return (
    <PageContainer {...containerStyles}>
      <Box {...headerRowStyles}>
        <Box {...{ flex: "1", minW: 0 }}>
          <PageHeading {...headingStyles}>{t("users.title")}</PageHeading>
          <PageSubtitle {...subtitleStyles}>
            {t("users.subtitle")}
          </PageSubtitle>
        </Box>
        <Box {...toolbarStyles}>
          <ActionButton {...refreshButtonStyles} onClick={() => refetch()}>
            <RefreshIcon size={18} />
            {t("users.refresh")}
          </ActionButton>
          <ActionButton
            {...newUserButtonStyles}
            display="inline-flex"
            alignItems="center"
            gap={2}
            px={4}
            py={2}
            borderRadius="lg"
            onClick={() => setCreateModalOpen(true)}
          >
            <PlusIcon size={18} />
            {t("users.newUser")}
          </ActionButton>
        </Box>
      </Box>

      <Box {...searchBarWrapperStyles}>
        <Box {...searchIconWrapperStyles}>
          <SearchIcon size={18} />
        </Box>
        <Input
          placeholder={t("users.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          {...searchInputStyles}
        />
      </Box>

      <Box {...mobileUserListStyles}>
        {filteredUsers.length === 0 ? (
          <Box
            py={8}
            px={4}
            textAlign="center"
            color="var(--color-muted)"
            bg="var(--color-bg-surface)"
            borderRadius="lg"
          >
            {users.length === 0 ? t("users.noUsers") : t("users.noSearchResults")}
          </Box>
        ) : (
          filteredUsers.map((user) => (
            <Box key={user.id} {...mobileUserCardStyles}>
              <Box {...mobileUserCardMainStyles}>
                <Box {...userAvatarStyles}>{getInitial(user.name)}</Box>
                <Box {...mobileUserCardMetaStyles}>
                  <Box as="span" fontWeight="bold" color="var(--color-text)" fontSize="sm">
                    {user.name}
                  </Box>
                  <Box as="span" color="var(--color-muted)" fontSize="xs">
                    {user.email}
                  </Box>
                </Box>
              </Box>
              <TypeBadge
                {...(user.type === "admin" ? pillAdminStyles : pillUserStyles)}
              >
                {user.type === "admin" ? t("common.userTypeAdmin") : t("common.userTypeUser")}
              </TypeBadge>
              <Box {...mobileUserCardActionsStyles}>
                <ActionButton
                  {...iconButtonStyles}
                  onClick={() => setEditUserId(user.id)}
                  aria-label={t("users.editAria")}
                >
                  <PencilIcon size={18} />
                </ActionButton>
                <ActionButton
                  {...deleteIconButtonStyles}
                  onClick={() => setDeleteUserTarget({ id: user.id, name: user.name })}
                  disabled={deleteUser.isPending}
                  aria-label={t("users.deleteAria")}
                >
                  {isDeletingId === user.id ? (
                    <Box as="span" fontSize="xs">
                      …
                    </Box>
                  ) : (
                    <TrashIcon size={18} />
                  )}
                </ActionButton>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <TableCard {...tableCardStyles}>
        <table
          className="users-table"
          style={{
            width: "100%",
            minWidth: "560px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyles}>{t("common.name")}</th>
              <th style={tableHeaderStyles}>{t("common.email")}</th>
              <th style={tableHeaderStyles}>{t("common.type")}</th>
              <th style={{ ...tableHeaderStyles, textAlign: "right" }}>{t("common.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: 24,
                    textAlign: "center",
                    color: "var(--color-muted)",
                  }}
                >
                  {users.length === 0 ? t("users.noUsers") : t("users.noSearchResults")}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={tableCellStyles}>
                    <Box {...nameCellContentStyles}>
                      <Box {...userAvatarStyles}>{getInitial(user.name)}</Box>
                      <Box as="span" fontWeight="bold" color="var(--color-text)">
                        {user.name}
                      </Box>
                    </Box>
                  </td>
                  <td style={tableCellStyles}>
                    <Box as="span" color="var(--color-muted)" fontSize="sm">
                      {user.email}
                    </Box>
                  </td>
                  <td style={tableCellStyles}>
                    <TypeBadge
                      {...(user.type === "admin"
                        ? pillAdminStyles
                        : pillUserStyles)}
                    >
                      {user.type === "admin" ? t("common.userTypeAdmin") : t("common.userTypeUser")}
                    </TypeBadge>
                  </td>
                  <td style={{ ...tableCellStyles, textAlign: "right" }}>
                    <Box as="span" display="inline-flex" gap={1} justifyContent="flex-end">
                      <ActionButton
                        {...iconButtonStyles}
                        onClick={() => setEditUserId(user.id)}
                        aria-label={t("users.editAria")}
                      >
                        <PencilIcon size={18} />
                      </ActionButton>
                      <ActionButton
                        {...deleteIconButtonStyles}
                        onClick={() => setDeleteUserTarget({ id: user.id, name: user.name })}
                        disabled={deleteUser.isPending}
                        aria-label={t("users.deleteAria")}
                      >
                        {isDeletingId === user.id ? (
                          <Box as="span" fontSize="xs">
                            …
                          </Box>
                        ) : (
                          <TrashIcon size={18} />
                        )}
                      </ActionButton>
                    </Box>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableCard>

      <CreateUserModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <EditUserModal
        isOpen={editUserId !== null}
        onClose={() => setEditUserId(null)}
        userId={editUserId}
      />
      <DeleteUserModal
        isOpen={deleteUserTarget !== null}
        onClose={() => setDeleteUserTarget(null)}
        userName={deleteUserTarget?.name ?? ""}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteUser.isPending && deleteUserTarget?.id === deleteUser.variables}
      />
    </PageContainer>
  );
}

export default Users;
