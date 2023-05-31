import { useFormik } from "formik";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { ICategoryCreate } from "./types";
import * as yup  from "yup";
import classNames from "classnames";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import http from "../../../http";
import {APP_ENV} from "../../../env";
import {ICategoryItem} from "../list/types";

const CategoryCreatePage = () => {

    const navigator = useNavigate();


    const initValues : ICategoryCreate = {

        id: 0,
        name: "",
        priority: null,
        image:"",
        description: "",
        parentId: null
    };

    const createSchema=yup.object({
        name: yup.string().required("Вкажіть назву"),
        description: yup.string().required("Вкажіть опис"),
        image: yup.string().required("Додайте зображення"),
        priority: yup.string().required("Вкажіть пріоритет"),
    });


    const onSubmitFormikData = (values: ICategoryCreate) => {
        console.log("Formik send data", values);
        http.post("api/categories/Create", values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                //console.log("Create date in server", resp);
                navigator("/");
            });
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const {values, errors, touched, handleSubmit, handleChange} = formik;

    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const file =  e.target.files[0];
            formik.setFieldValue(e.target.name, file);
        }
    };

    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http.get("api/Categories/list")
            .then(resp => {
                const data= resp.data;
                setList(data);
            });
    }, []);

    return (
        <>
            <h1 className="text-center">Додати категорію</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Назва
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {"is-invalid": errors.name && touched.name})}
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}

                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Фото
                    </label>
                    <input
                        type="file"
                        className={classNames("form-control", {"is-invalid": errors.image && touched.image})}
                        id="image"
                        name="image"
                        onChange={onImageChangeHandler}
                    />
                    {errors.image && touched.image && <div className="invalid-feedback">{errors.image}</div>}
                </div>

                <div className="form-floating mb-3">
          <textarea
              className={classNames("form-control", {"is-invalid": errors.description && touched.description})}
              placeholder="Вкажіть опис"
              id="description"
              name="description"
              style={{ height: "100px" }}
              value={values.description}
              onChange={handleChange}
          ></textarea>
                    {errors.description && touched.description && <div className="invalid-feedback">{errors.description}</div>}
                    <label htmlFor="description">Опис</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">
                       Пріоритет
                    </label>
                    <input
                        type="number"
                        className={classNames("form-control", {"is-invalid": errors.priority && touched.priority})}
                        id="priority"
                        name="priority"
                        onChange={handleChange}
                    />
                    {errors.priority && touched.priority && <div className="invalid-feedback">{errors.priority}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">
                        Батьківська категорія (Не обовязково)
                    </label>
                <select className="form-select"
                        aria-label="Default select example"
                        id="parentId"
                        name="parentId"

                        onChange={handleChange}>
                    <option  selected >Обрати категорію</option>
                    {list.map(category =>(
                    <option onChange={handleChange} key={category.id} value={category.id}>{category.name}</option>

                ))}
                </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Додати
                </button>
            </form>
        </>
    );
};
export default CategoryCreatePage;