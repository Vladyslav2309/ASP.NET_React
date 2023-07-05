import "./admin.scss";
import {Outlet, useNavigate} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import {useSelector} from "react-redux";
import {IAuthUser} from "../../auth/types";
import {useEffect} from "react";

const AdminLayout = () => {
    const navigate = useNavigate();
    const {isAuth, user} = useSelector((store: any) => store.auth as IAuthUser);
    const isAdmin = user?.roles === "Admin";
    useEffect(() => {
        if(isAuth)
        {
            if(!isAdmin)
                navigate("/pages/403");
        }
        else {
            navigate('/login');
        }
    },[]);
    return (
        <>
            <AdminHeader/>
        <div className={"admin container"}>
        <div className="row">
        <AdminSidebar/>
        <main className="col-sm-8 col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet/>
            </main>
            </div>
            </div>
            </>
    )
}

export default AdminLayout;
