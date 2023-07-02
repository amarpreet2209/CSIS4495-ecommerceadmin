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
                        <th>ID</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                {orders.length > 0 && orders.map(order => (
                    <tr>
                        <td>{order._id}</td>
                        <td>
                            {order.name} {order.email}<br/>
                            {order.city} {order.postalCode}<br/>
                            {order.country}<br/>
                            {order.streetAddress}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    )
}
