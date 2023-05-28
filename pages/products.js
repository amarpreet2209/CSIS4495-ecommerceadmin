import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";
import {useEffect, useState} from "react";

export default function products()  {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then((response) => {
            console.log(response.data);
            setProducts(response.data);
        })
    }, []);
    return (
        <Layout>
            <Link className={"btn-primary"} href={'/product/new'}>Add new Product</Link>
        <table>
            <thead>
                <tr>
                    <td>Product Name</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr>
                    <td>
                        {product.title}
                    </td>
                    <td>buttons</td>
                </tr>
            ))}
            </tbody>

        </table>
        </Layout>
    )
}
