import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { ICategoryEdit } from "./types";
import * as yup from "yup";
import classNames from "classnames";
import {useNavigate, useParams} from "react-router-dom";
import http from "../../../../http";
import { ICategoryItem } from "../list/types";
import {ICategoryCreate} from "../create/types";

const CategoryEditPage = () => {

    const navigator = useNavigate();

    const {id} = useParams();

    const initValues: ICategoryEdit = {
        id: 0,
        name: "",
        priority: null,
        imageUpload: null,
        description: "",
        parentId: null,
    };

    const createSchema = yup.object({
        name: yup.string().required("Вкажіть назву"),
        description: yup.string().required("Вкажіть опис"),
        priority: yup.string().required("Вкажіть пріоритет"),
    });

    const onSubmitFormikData = (values: ICategoryEdit) => {
        console.log("Formik send data", values);
        http
            .put(`api/categories/edit`, values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                //console.log("Create date in server", resp);
                navigator("../");
            });
    };

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData,
    });

    const { setFieldValue,
        values,
        errors,
        touched,
        handleSubmit,
        handleChange } = formik;

    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const file = e.target.files[0];
            formik.setFieldValue(e.target.name, file);
        }
    };

    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http.get("api/Categories/list").then((resp) => {
            const data = resp.data;
            setList(data);
        });
    }, []);

    useEffect(() => {
        http.get<ICategoryItem>(`api/categories/get/${id}`)
            .then(resp => {
                const {data} = resp;
                setFieldValue("id", data.id);
                setFieldValue("name", data.name);
                setFieldValue("description", data.description);
                setFieldValue("priority", data.priority);
                console.log("priority", data.priority);
                const parentId = data.parentId===null ? 0: data.parentId;
                setFieldValue("parentId", parentId);
            });
    },[id]);


    return (
        <>
            <h1 className="text-center">Зміна категорії</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Назва
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {
                            "is-invalid": errors.name && touched.name,
                        })}
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Фото
                    </label>
                    <input
                        type="file"
                        className={classNames("form-control", {
                            "is-invalid": errors.imageUpload && touched.imageUpload,
                        })}
                        id="imageUpload"
                        name="imageUpload"
                        onChange={onImageChangeHandler}
                    />
                    {errors.imageUpload && touched.imageUpload && (
                        <div className="invalid-feedback">{errors.imageUpload}</div>
                    )}
                </div>

                <div className="form-floating mb-3">
          <textarea
              className={classNames("form-control", {
                  "is-invalid": errors.description && touched.description,
              })}
              placeholder="Вкажіть опис"
              id="description"
              name="description"
              style={{ height: "100px" }}
              value={values.description}
              onChange={handleChange}
          ></textarea>
                    {errors.description && touched.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                    )}
                    <label htmlFor="description">Опис</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">
                        Пріоритет
                    </label>
                    <input
                        type="number"
                        className={classNames("form-control", {
                            "is-invalid": errors.priority && touched.priority,
                        })}
                        id="priority"
                        name="priority"
                        onChange={handleChange}
                        value={values.priority===null ? 0 : values.priority }
                    />
                    {errors.priority && touched.priority && (
                        <div className="invalid-feedback">{errors.priority}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">
                        Батьківська категорія (Не обовязково)
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="parentId"
                        name="parentId"
                        onChange={handleChange}
                        value={values.parentId===null ? 0 : values.parentId}
                    >
                        <option value={0} selected>Обрати категорію</option>
                        {list.map((category) => (
                            <option
                                onChange={handleChange}
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Зберегти зміни
                </button>
            </form>
        </>
    );
}

export default CategoryEditPage;
