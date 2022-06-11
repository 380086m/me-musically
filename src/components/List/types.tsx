export interface Item {
  imageUrl: string;
  text: string;
  small?: string;
}

export interface ListProps {
  items: Item[];
}
