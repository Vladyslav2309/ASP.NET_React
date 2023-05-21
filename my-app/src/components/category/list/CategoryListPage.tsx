import { useEffect, useState } from "react";
import http from "../../../http";
import { ICategoryItem } from "./types";

const CategoryListPage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http.get("api/Categories/list")
            .then(resp => {
                const data= resp.data;
                setList(data);
            });
    }, []);

    const mapList = list.map(category => (
        <tr key={category.id}>
            <td>
                <img src={category.image} alt="фото" width={50} />
            </td>
            <td>{category.name}</td>
            <td>{category.parentId}</td>
            <td>{category.description}</td>
        </tr>
    ));

    return (
        <>
            <h1 className="text-center">Список категорій</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Фото</th>
                    <th scope="col">Назва</th>
                    <th scope="col">Батько</th>
                    <th scope="col">Опис</th>
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