import "./App.css";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import CategoryListPage from "./components/admin/category/list/CategoryListPage";
import CategoryCreatePage from "./components/admin/category/create/CategoryCreatePage";
import LoginPage from "./components/auth/login/LoginPage";
import CategoryEditPage from "./components/admin/category/edit/CategoryEditPage";
import AdminLayout from "./components/admin/container/AdminLayout";
import AdminHomePage from "./components/admin/home/AdminHomePage";
import HomePage from "./components/home/HomePage";
import ForbiddenPage from "./components/pages/ForbiddenPage";
import ProductListPage from "./components/admin/product/list/ProductListPage";
import ProductCreatePage from "./components/admin/product/create/ProductCreatePage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                </Route>
                <Route path={"/pages"}>
                    <Route path={"403"} element={<ForbiddenPage/>}/>
                </Route>
                <Route path={"/admin"} element={<AdminLayout/>}>
                    <Route index element={<AdminHomePage/>}/>
                    <Route path={"categories"}>
                        <Route index element={<CategoryListPage/>}/>
                        <Route path="create" element={<CategoryCreatePage/>}/>
                        <Route path="edit/:id" element={<CategoryEditPage/>}/>
                    </Route>
                    <Route path={"products"}>
                        <Route index element={<ProductListPage/>}/>
                        <Route path="create" element={<ProductCreatePage/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
