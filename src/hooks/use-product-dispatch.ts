import { useGetProductsQuery } from "@/stores/services/product.service";
import { useGetStocksQuery } from "@/stores/services/stock.service";

const useProductDispatch = (products: boolean, stocks: boolean) => {
  const {
    data: productData,
    isFetching: productsIsFetching,
    error: productsError,
  } = useGetProductsQuery(undefined, { skip: !products });

  const {
    data: stockData,
    isFetching: stocksIsFetching,
    error: stocksError,
  } = useGetStocksQuery(undefined, { skip: !stocks });

  return {
    productData,
    productsIsFetching,
    productsError,
    stockData,
    stocksIsFetching,
    stocksError,
  };
};

export default useProductDispatch;
