import add from "../../../assets/add.jpg";
import {ChangeEvent, FC, useState} from "react";
import {IUploadImage, IUploadImageResult} from "./types";
import http from "../../../../http";
import {APP_ENV} from "../../../../env";

interface IProps {
    field: string;
}

const ProductFileInputGroup: FC<IProps> = ({
                                               field
                                           }) => {
    const [images, setImages] = useState<IUploadImageResult[]>([]);

    const onChangeFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const file = files[0];
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                alert("Не допустимий тип файлу!");
                return;
            }
            const upload: IUploadImage = {
                image: file
            }
            try {
                const result = await http.post<IUploadImageResult>("api/products/upload-image", upload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setImages([...images, result.data]);
                //console.log("Upload image is good");
            }
            catch (error) {
                console.log("log info", error);
            }
        }
    }
    return (
        <>
            <div className="mb-3">
                <div className="row">
                    <div className=" col-sm-4 col-md-3 col-lg-2">
                        <label htmlFor={field}>
                            <h6>Оберіть фото</h6>
                            <img src={add} alt="Фото"
                                 className={"img-fluid"}
                                 style={{cursor: "pointer"}}
                            />
                        </label>
                        <input type="file"
                               className={"d-none"}
                               accept={"image/jpeg, image/jpg, image/png"}
                               id={field}
                               onChange={onChangeFileHandler}
                        />
                    </div>
                    {
                        images.map(x=>{
                            return (
                                <div className=" col-sm-4 col-md-3 col-lg-2">

                                    <img src={`${APP_ENV.BASE_URL}images/300_${x.name}`} alt="Фото"
                                         className={"img-fluid"}
                                    />

                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>

    );
}
export default ProductFileInputGroup;
