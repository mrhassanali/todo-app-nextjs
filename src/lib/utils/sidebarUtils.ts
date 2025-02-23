import { LucideIcon } from "lucide-react";


export const isMenuActive = (pathname: string, url: string) => {
  return pathname === url;
};

// Function to add isActive property to each item
export const getNavigationItems = (
  pathname: string,
  Items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[]
) => {
  return Items.map((item) => ({
    ...item,
    isActive: isMenuActive(pathname, item.url),
  }));
};
