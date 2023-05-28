import Layout from "@/components/Layout";
import Link from "next/link";

export default function products()  {
    return (
        <Layout>
            <Link className={"btn-primary"} href={'/product/new'}>Add new Product</Link>
        </Layout>
    )
}
