type ProductImage = {
  id: number;
  name: string;
  src: string;
};

type ProductData = {
  id?: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  collection: string[];
  inventoryStock: number;
  hasInventoryVariations: boolean;
  prodImgs: ProductImage[];
  colors: string[];
  sizes: string[];
  selfShipping: boolean;
  instaShipping: boolean;
};

export default ProductData;
