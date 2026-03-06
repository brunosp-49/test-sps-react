export type LayoutProps = Record<string, never>;

export type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};
