export enum MenuItemName {
  HOME = "home",
  RESEARCHERS = "researchers",
  SUBJECTS = "subjects",
  PREDICT = "predict",
  EXPLORE = "explore",
  ME = "me",
  UPLOAD = "upload",
}

export type MenuItem = {
  name: MenuItemName;
  text: string;
  slug: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isAccent?: boolean;
};
