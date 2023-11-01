import { Button } from "@chakra-ui/react";
import useFetch from "../../../hooks/useFetch";
import ProductsTable from "../../../component/partials/products/ProductsTable";


const url = `${import.meta.env.VITE_SERVER_URL}/products/managers/all`

function Products() {

  const [data,isLoading,error] = useFetch(url)

  return (
    <div style={{marginTop:'30px'}}>

      {isLoading && <span>Loading...</span>}

      {error && <span>{error.message}</span>}

      {!data && <span>No Products</span>}

      {data && <ProductsTable products={data.products} />}
    </div>
  )
}

export default Products