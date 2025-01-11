import ProductData from './ProductData';

interface RootState {
  product: {
    productData: ProductData;
    products: ProductData[];
  };
}

export default RootState;
