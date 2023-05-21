import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaulHeader"

const DefaultLayout = () => {
    return (
        <>
            <DefaultHeader />
        <div className="container">
            <Outlet />
            </div>
            </>
    );
}
export default DefaultLayout;