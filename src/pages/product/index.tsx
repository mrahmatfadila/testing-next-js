import ProductView from "@/views/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/swr/fetcher";


const ProductPage = () => {
    // useState
    // const [isLogin, setIsLogin] = useState(true);

    const [products, setProducts] = useState([]);

    // useRouter
    const { push } = useRouter();

    // mending pakai middleware untuk redirectc ke home 
    // useEffect(() => {
    //     push("/")
    // }, [])

    // // useEffect (jika halamannya di load)
    // useEffect(() => {
    //     if(!isLogin) {
    //         push("/auth/login");
    //     }
    // }, [])

    const { data, error, isLoading } = useSWR("/api/product", fetcher);
    // console.log(data);
    // console.log(error);
    // console.log(isLoading);

    // useEffect(() => {
    //     fetch('/api/product').then((res) => res.json()).then((response) => {
    //         setProducts(response.data);
    //     })
    // }, [])

    return (
        <div>
            <ProductView products={isLoading ? [] : data?.data}/>
        </div>
    );
};

export default ProductPage;