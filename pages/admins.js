import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {withSwal} from "react-sweetalert2";
import Spinner from "@/components/Spinner";

function AdminsPage({swal}) {
    const [email, setEmail] = useState('');
    const [adminEmails, setAdminEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    function addAdmin(ev) {
        ev.preventDefault();
        axios.post('/api/admins', {email}).then(res => {
            swal.fire({
                title: 'Admin Created',
                icon: "success"
            })
            setEmail('');
            loadAdmins();
        })
    }
    
    function loadAdmins() {
        setIsLoading(true);
        axios.get('/api/admins')
            .then(res => {
                setAdminEmails(res.data);
                setIsLoading(false);
            })
    }
    
    useEffect(() => {
        loadAdmins();
    } , []);
    
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
                {isLoading && (
                    <tr>
                        <td colSpan={2}>
                            <div className={"py-4"}>
                                <Spinner fullWidth={true} />
                            </div>
                        </td>
                    </tr>
                )}
                {adminEmails.length > 0 && adminEmails.map(adminEmail => (
                    <tr>
                        <td>{adminEmail.email}</td>
                        <td></td>
                    </tr>
                ))}
                </tbody>
                
            </table>
        </Layout>
    )
}

export default withSwal(({swal}) => (
    <AdminsPage swal={swal}/>
))
