import Layout from "@/components/Layout";
import {useEffect} from "react";

export default function OrdersPage() {
    
    useEffect(() => {
    
    },[]);
    
    return (
        <Layout>
            <table className={"basic"}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </Layout>
    )
}
