import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Categories() {

    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');

    function fetchCategories() {
        axios.get('/api/categories').then((result) => {
            setCategories(result.data);
        })
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    async function saveCategory(ev) {
        ev.preventDefault();
        const data = {name, parentCategory};
        if(editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }
        setName('');
        fetchCategories();
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id || '');
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory.name}`  : 'Create new category'}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    className={"mb-0"}
                    type="text"
                    placeholder={"Category Name"}
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />

                <select className={"mb-0"} value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
                    <option value={""}>No Parent Category</option>
                    {categories.length > 0 && categories.map((category) => (
                        <option value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button type={'submit'} className="btn btn-primary py-1">Save</button>
            </form>
            <table className={"basic mt-4"}>
                <thead>
                <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {categories.length > 0 && categories.map((category) => (
                    <tr>
                       <td>{category.name}</td>
                       <td>{category?.parent?.name}</td>
                        <td>
                            <button className={"btn-primary mr-1"} onClick={() => editCategory(category)}>Edit</button>
                            <button className={"btn-primary"}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );

}
