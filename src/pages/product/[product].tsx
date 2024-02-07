import { useRouter } from "next/router";
import { fetcher } from "../lib/swr/fetcher";
import useSWR from "swr";
import DetailProduct from "@/views/DetailProduct";
import { productType } from "@/types/product.type";

const DetailProductPage = ({ product }: {product: productType}) => {
    const {query} = useRouter();

    // untuk client side rendering
    // const { data, error, isLoading } = useSWR(`/api/product/${query.product}`, fetcher);

    return (
        <div>
            {/* client-side rendering */}
            {/* <DetailProduct product={isLoading ? [] : data.data}/> */}

            {/* server-side & Static-side */}
            <DetailProduct product={product}/>
        </div>
    )
}

export default DetailProductPage;

export async function getServerSideProps( { params, }: {params: {product: string}; }) {
    // console.log(params.product)
    // fetch data from external API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.product}`);
    const response = await res.json();

    return {
        props: {
            product: response.data,
        },
    };
}

// export async function getStaticPaths() {
//     const res = await fetch(`http://localhost:3000/api/product`);
//     const response = await res.json();

//     const paths = response.data.map((product: productType) => ({
//         params: {
//             product: product.id,
//         }
//     }));
//     return { paths, fallback: false };
// }

// export async function getStaticProps({params, }: {params: {product: string}; }) {
//     const res = await fetch(`http://localhost:3000/api/product/${params.product}`);
//     const response = await res.json();

//     return {
//         props: {
//             product: response.data,
//         }
//     }
// }