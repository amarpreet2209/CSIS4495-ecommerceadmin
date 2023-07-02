import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrdersPage() {
    
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data)
        })
    },[]);
    
    return (
        <Layout>
            <table className={"basic"}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                {orders.length > 0 && orders.map(order => (
                    <tr>
                        <td>{order.createdAt}</td>
                        <td>
                            {order.name} {order.email}<br/>
                            {order.city} {order.postalCode}<br/>
                            {order.country}<br/>
                            {order.streetAddress}
                        </td>
                        <td>
                            {order.line_items.map(l => (
                                <>
                                    {l.price_data?.product_data.name} x {l.quantity}<br/>
                                </>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    )
}
