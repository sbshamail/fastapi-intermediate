export interface ListDropdownDataType {
  [key: string]: any;
  icon?: string;
  name: string;
  link?: string;
  children?: ListDropdownDataType[];
}

export interface CategoryDataType extends ListDropdownDataType {}
