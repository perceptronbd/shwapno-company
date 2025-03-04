export const TAG_TYPES = {
  USER_PROFILE: "UserProfile",
  PRODUCT: "Product",
  CATEGORY: "Category",
  STOCK: "Stock",
  ORDER: "Order",
} as const;

export const TAG_TYPES_LIST = Object.values(TAG_TYPES);

export const TAG_TYPES_KEYS = Object.keys(
  TAG_TYPES,
) as (keyof typeof TAG_TYPES)[];

export type TagTypeKeys = (typeof TAG_TYPES_KEYS)[number];
export type TagTypes = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];
