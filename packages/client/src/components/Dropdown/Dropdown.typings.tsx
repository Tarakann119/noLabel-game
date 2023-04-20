export type TDropdownProps = {
  childrenBtn: React.ReactNode | undefined;
  childrenMenu: React.ReactNode | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
};
