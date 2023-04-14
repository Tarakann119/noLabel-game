export type tdropdown = {
  childrenBtn: react.reactnode | undefined;
  childrenMenu: react.reactnode | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
};
