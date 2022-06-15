export interface Item {
  imageUrl?: string;
  text: string;
  small?: string;
  href?: string;
}

export interface ListProps {
  items: Item[];
  shape?: "circle" | "square";
  ordened?: boolean;
}
