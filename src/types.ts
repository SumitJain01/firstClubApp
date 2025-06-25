export type Product = {
  id: string;
  name: string;
  price: number;
  isInStock: number;
  image: string;
};

export type CartItem = Product & {
  qty: number;
  inStock: boolean;
};

export type WidgetConfig = {
  id: string;
  type: 'related-products' | 'promo-banner' | 'payment-offer';
  payload: any;
};

export type RootStackParamList = {
  Cart: undefined;
  Payment: undefined;
  Listing: undefined;
};
export type PaginatedProducts = {
  data: Product[];
  nextPage?: number;
};
