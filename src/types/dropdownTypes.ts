import { ReactElement } from "react";

export interface TriggerType {
  trigger: ReactElement | string;
}

export interface DropdownProps extends TriggerType {
  items?: string[];
  children?: React.ReactNode;
  onSelect?: (item: string) => void;
  textDrop?: boolean;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  onToggle?: (isOpen: boolean) => void;
}
