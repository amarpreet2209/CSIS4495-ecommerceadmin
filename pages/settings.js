import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function SettingsPage() {
    const [products, setProducts] = useState([]);
    const [featuredProductId, setFeaturedProductId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        
        axios.get('/api/products').then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        })
        
    },[])
    
    
    async function saveSettings() {
        await axios.put('/api/settings', {
            name: 'featuredProductId',
            value: featuredProductId
        })
    }
    
    return (
        <Layout>
            <h1>Settings</h1>
            {isLoading && (
                <Spinner/>
            )}
            {!isLoading && (
                <>
                    <label>Featured Products</label>
                    <select onChange={ev => setFeaturedProductId(ev.target.value)}>
                        {products.length > 0 && products.map(product => (
                            <option value={product._id}>{product.title}</option>
                        ))}
                        
                    </select>
                    
                    <div>
                        <button
                            onClick={saveSettings}
                            className={"btn-primary"}>Save Settings</button>
                    </div>
                </>
            )}
            
           
        </Layout>
    )
}
