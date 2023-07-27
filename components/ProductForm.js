import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties,
    }) {
    // console.log("checking " +  existingTitle + ", " + existingDescription + ", " + existingPrice);
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');

    const [category, setCategory] = useState(assignedCategory || '');

    const [price, setPrice] = useState(existingPrice || '');
    const [productProperties, setProductProperties] = useState(assignedProperties ||    {});

    const [images, setImages] = useState(existingImages || []);

    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    const [isUploading, setIsUploading] = useState(false);
    // console.log(_id);

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);

    useEffect(() => {
        setCategoriesLoading(true);
        axios.get('/api/categories').then((result) => {
            setCategories(result.data);
            setCategoriesLoading(false);
        })
    },[]);
    async function saveProduct(ev) {
        ev.preventDefault();


        const data = {title, description, price, images, category, properties:productProperties };
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
            setIsUploading(true);
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
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id===category);
        propertiesToFill.push(...catInfo.properties,);

        while(catInfo?.parent?._id) {
            const parentCat = categories.find(({_id}) => _id===catInfo?.parent?._id)
            propertiesToFill.push(...parentCat.properties)
            catInfo = parentCat;
        }
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProdProps = {...prev};
            newProdProps[propName] = value;
            return newProdProps;
        })
    }

    return (
            <form onSubmit={saveProduct}>

                <label>Product name</label>
                <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}/>

                <label>Category</label>
                <select
                    value={category}
                    onChange={ev => setCategory(ev.target.value)}
                >
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                
                {categoriesLoading && (
                    <Spinner/>
                )}
                {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                        <div key={p.name} className={""}>
                            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                            <div>
                                <select
                                    value={productProperties[p.name]}
                                    onChange={(ev) => setProductProp(p.name, ev.target.value)}>
                                    <option value={""}></option>
                                    {p.values.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>


                        </div>
                    )
                )}

                <label>Photos</label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable
                        className={"flex flex-wrap gap-1"}
                        list={images}
                        setList={updateImagesOrder}
                    >
                        {!!images?.length && images.map(link => (
                            <div key={link} className={"h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"}>
                                <img src={link} alt=""  className={"rounded-lg"}/>
                            </div>
                        ))}
                    </ReactSortable>

                    {isUploading && (
                        <div className={"h-24 flex items-center"}>
                            <Spinner/>
                        </div>
                    )}
                    <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        <div>
                            Add Image
                        </div>
                        <input type="file" className="hidden" onChange={uploadImages}/>
                    </label>
                </div>
                <label>Description</label>
                <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                <label>Price (in USD)</label>
                <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}/>
                <button type={"submit"} className={"btn-primary"}>Save</button>

            </form>
    )
}
