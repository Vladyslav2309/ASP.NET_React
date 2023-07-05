import {useEffect, useState} from "react";
import http from "../../../../http";
import {ICategoryItem} from "./types";
import {APP_ENV} from "../../../../env";
import {useDispatch} from "react-redux";
import {AuthUserActionType} from "../../../auth/types";
import {Link} from "react-router-dom";
import ModalDelete from "../../../common/ModalDelete";

const CategoryListPage = () => {



    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http.get("api/Categories/list")
            .then(resp => {
                    const data = resp.data;
                setList(data);
            });
    }, []);

    function getParentCategoryName(parentId: any) {
        const parentCategory = list.map(category => (
            category.id==parentId?category.name:null
        ));
        return parentCategory;
    }



    const onDelete = async (id:number) => {
        try {
            await http.delete(`delete/${id}`);
            setList(list.filter(x=>x.id!==id));
        } catch {
            console.log("Delete bad request");
        }
    }

    const mapList = list.map(category => (
        <tr key={category.id}>
            <td>
                <img src={`${APP_ENV.BASE_URL}images/50_${category.image}`} alt="фото" width={50}/>
            </td>
            <td>{category.name}</td>
            <td>{getParentCategoryName(category.parentId)}</td>
            <td>{category.description}</td>
            &nbsp;&nbsp;
           <td><Link to={`edit/${category.id}`} className={"btn btn-info"}>Змінити</Link></td>
            <td><ModalDelete id={category.id} text={category.name} deleteFunc={onDelete}/></td>
        </tr>
    ));
    return (
        <>
            <h1 className="text-center">Список категорій</h1>
            <Link to={"create"} className={"btn btn-success"}>Додати</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Фото</th>
                    <th scope="col">Назва</th>
                    <th scope="col">Батько</th>
                    <th scope="col">Опис</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {mapList}
                </tbody>
            </table>
        </>
    );
};
export default CategoryListPage;
