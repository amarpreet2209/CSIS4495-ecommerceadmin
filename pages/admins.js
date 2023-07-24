import Layout from "@/components/Layout";
import {useState} from "react";
import axios from "axios";

export default function AdminsPage() {
    const [email, setEmail] = useState('');
    
    function addAdmin(ev) {
        ev.preventDefault();
        axios.post('/api/admins', {email}).then(res => {
            alert(res.data);
        })
    }
    
    return (
        <Layout>
            <h1>Admins</h1>
            <h2>Add new admin</h2>
            
            <form onSubmit={addAdmin}>
                <div className="flex gap-2">
                    <input
                        type={"text"}
                        className={"mb-0"}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder={"google email"} />
                    <button
                        type={"submit"}
                        className={"btn-primary py-1 whitespace-nowrap"}>
                        Add Admin
                    </button>
                </div>
            </form>
            
            <h2>Existing admins</h2>
            <table className="basic">
                <thead>
                    <tr>
                        <th className={"text-left"}>Admin Google email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test@gmail.com</td>
                    </tr>
                </tbody>
                
            </table>
        </Layout>
    )
}
