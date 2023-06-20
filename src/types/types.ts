export interface Color {
  id: number;
  name: string;
}

export interface Good {
  id: number;
  name: string;
  colorId: number;
}

export interface GoodWithColor extends Good {
  color: Color | null;
}
