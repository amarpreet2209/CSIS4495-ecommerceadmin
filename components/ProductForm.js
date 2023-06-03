import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    }) {
    console.log("checking " +  existingTitle + ", " + existingDescription + ", " + existingPrice);
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');

    const [images, setImages] = useState(existingImages || []);

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

    async function uploadImages(ev) {
        const files = ev.target?.files;

        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            // const res = await axios.post('/api/upload', data,{
            //     headers: {'Content-Type': 'multipart/form-data'}
            // });
            const res = await axios.post('/api/upload',  data);
            console.log("res.data.links ",res.data.links);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            })
        }
    }

    return (
            <form onSubmit={saveProduct}>

                <label>Product name</label>
                <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}/>
                <label>Photos</label>
                <div className="mb-2">
                    {!!images?.length && images.map(link => (
                        <div>
                            {link}
                        </div>
                    ))}
                    <label className="w-24 h-24 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        <div>
                            Upload
                        </div>
                        <input type="file" className="hidden" onChange={uploadImages}/>
                    </label>

                    {!images?.length && (
                        <div>
                            No photos in this product
                        </div>
                    )}
                </div>
                <label>Description</label>
                <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                <label>Price (in USD)</label>
                <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}/>
                <button type={"submit"} className={"btn-primary"}>Save</button>

            </form>
    )
}
