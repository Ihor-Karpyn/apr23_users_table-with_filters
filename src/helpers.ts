import { Color, Good, GoodWithColor } from './types/types';

export const findColorById = (colors: Color[], id: number) => {
  return colors.find(color => color.id === id) || null;
};

export const prepareGood = (
  goods: Good[], colors: Color[],
): GoodWithColor[] => {
  return goods.map(good => ({
    ...good,
    color: findColorById(colors, good.colorId),
  }));
};

export const getNewId = (arr: { id: number }[]): number => {
  const ids = arr.map((item) => item.id);
  const maxId = Math.max(...ids);

  return Number.isFinite(maxId)
    ? maxId + 1
    : 1;
};
