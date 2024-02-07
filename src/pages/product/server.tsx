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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
    const response = await res.json();

    return {
        props: {
            products: response.data
        }
    }
}