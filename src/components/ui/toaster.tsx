"use client"

import React from "react";
import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

interface ToastItem {
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: string;
  action?: { label: string };
  closable?: boolean;
}

const getToastRootStyles = (type?: string) => {
  const base = {
    width: { base: "calc(100% - 2rem)", md: "380px" },
    minHeight: "56px",
    padding: "14px 16px",
    gap: "12px",
    alignItems: "center",
    backgroundColor: "var(--color-bg-surface)",
    borderRadius: "12px",
    borderWidth: "1px",
    borderColor: "var(--color-border)",
    borderLeftWidth: "4px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
  };
  if (type === "success") {
    return { ...base, borderLeftColor: "var(--color-success)" };
  }
  if (type === "error") {
    return { ...base, borderLeftColor: "var(--color-destructive)" };
  }
  if (type === "warning") {
    return { ...base, borderLeftColor: "var(--color-warning)" };
  }
  return { ...base, borderLeftColor: "var(--color-primary)" };
};

const ToasterContent = (toast: ToastItem) => (
  <Toast.Root {...getToastRootStyles(toast.type)}>
    {toast.type === "loading" ? (
      <Spinner size="sm" color="blue.solid" flexShrink={0} />
    ) : (
      <Toast.Indicator
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt="1px"
        {...({
          color:
            toast.type === "success"
              ? "var(--color-success)"
              : toast.type === "error"
                ? "var(--color-destructive)"
                : toast.type === "warning"
                  ? "var(--color-warning)"
                  : "var(--color-primary)",
        } as React.ComponentProps<typeof Toast.Indicator>)}
      />
    )}
    <Stack gap="2" flex="1" maxWidth="100%" minW={0}>
      {toast.title != null && (
        <Toast.Title
          {...({
            children: toast.title,
            fontSize: "15px",
            fontWeight: "600",
            color: "var(--color-text)",
            lineHeight: "1.4",
          } as React.ComponentProps<typeof Toast.Title>)}
        />
      )}
      {toast.description != null && (
        <Toast.Description
          {...({
            children: toast.description,
            fontSize: "14px",
            fontWeight: "normal",
            color: "var(--color-muted)",
            lineHeight: "1.4",
          } as React.ComponentProps<typeof Toast.Description>)}
        />
      )}
    </Stack>
    {toast.action != null && (
      <Toast.ActionTrigger {...({ children: toast.action.label } as React.ComponentProps<typeof Toast.ActionTrigger>)} />
    )}
    {toast.closable && <Toast.CloseTrigger />}
  </Toast.Root>
);

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        {...({
          toaster,
          insetInline: { mdDown: "4" },
          children: ToasterContent,
        } as React.ComponentProps<typeof ChakraToaster>)}
      />
    </Portal>
  );
};
