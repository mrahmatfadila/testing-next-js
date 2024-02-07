import ProductView from "@/views/Product";
import { productType } from "@/types/product.type";

const ProductPage = (props: {products: productType}) => {
    const { products } = props;
    return (
        <div>
            <ProductView products={products}/>
        </div>
    )
}

export default ProductPage;

// di panggil setiap melakukan sequest atau setiap halamannya di buka 
export async function getServerSideProps() {
    // fetch data from external API
    const res = await fetch('http://localhost:3000/api/product');
    const response = await res.json();

    return {
        props: {
            products: response.data
        }
    }
}