import { MenuItem } from "@/constants/dropdown";
import { ReactElement } from "react";

export interface TriggerType {
  trigger: ReactElement | string;
}

export interface DropdownProps extends TriggerType {
  items?: MenuItem[];
  children?: React.ReactNode;
  onSelect?: (item: MenuItem) => void;
  textDrop?: boolean;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  onToggle?: (isOpen: boolean) => void;
}
