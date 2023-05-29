import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice}) {
    console.log("checking " +  existingTitle + ", " + existingDescription + ", " + existingPrice);
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    console.log(_id);

    async function saveProduct(ev) {
        ev.preventDefault();


        const data = {title, description, price};
        // updating instead of creating
        if(_id) {
             await axios.put('/api/products', {...data,_id});
        } else {
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);


    }
    if(goToProducts) {
        router.push('/products');
    }
    return (
            <form onSubmit={saveProduct}>

                <label>Product name</label>
                <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}/>
                <label>Description</label>
                <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                <label>Price (in USD)</label>
                <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}/>
                <button type={"submit"} className={"btn-primary"}>Save</button>

            </form>
    )
}
