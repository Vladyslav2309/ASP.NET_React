import add from "../../../../assets/add.png";
import {ChangeEvent, FC, useState} from "react";
import {IUploadImage, IUploadImageResult} from "./types";
import http from "../../../../http";
import {APP_ENV} from "../../../../env";

interface ICategoryParentSelectProps {
    images: IUploadImageResult[];
    setImages: (images: IUploadImageResult[]) => void;
}

const ProductFileInputGroup: FC<ICategoryParentSelectProps> = ({ images, setImages }) => {

    // const [images, setImages] = useState<IUploadImageResult[]>([]);

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("on change " + e.target.files);
        const files = e.target.files;
        if (files) {
            const file = files[0];
            const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowTypes.includes(file.type)) {
                alert("Не вірний формат файлу");
                return;
            }
            const upload: IUploadImage = {
                image: file
            }
            http.post('api/products/UploadImage', upload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(resp => {
                    console.log(upload, resp);
                    setImages([...images, resp.data]);
                })
                .catch(bad => {
                    console.log("Bad request", bad);
                })

        }

    }
    const onDeleteFileHandler = async (id: number) => {
        try {
            await http.delete(`api/products/RemoveImage/${id}`);
            setImages(images?.filter(x => x.id !== id));
        } catch {
            console.log("Delete bad request");
        }
    }

    return (

        <>
            <h6>Оберіть фото</h6>

            <div className="row m-0" >
                <br></br>
                <div className="col position-relative">
                    <div className="imgUp">
                        <div className="imagePreview align-items-center">
                            <img
                                src={add}
                                className="img-fluid"
                                alt="Зображення"
                                style={{ height: '100%', maxHeight: "120px", overflow: 'hidden' }}
                            />
                        </div>

                        <label className="btn btn-primary">
                            Upload
                            <input
                                type="file"
                                className="uploadFile img"
                                //value="Upload Photo"
                                onChange={onChangeFileHandler}
                                style={{ width: '0px', height: '0px', overflow: 'hidden' }}
                            />
                        </label>


                    </div>
                </div>
                {images.map((img) => (
                    <>
                        <br></br>
                        <div className="col position-relative">
                            <div className="imgUp">
                                <div className="imagePreview align-items-center">
                                    <img
                                        src={`${APP_ENV.BASE_URL}images/300_` + img.name}
                                        className="img-fluid"
                                        alt="Зображення"
                                        style={{ height: '100%', maxHeight: "120px", overflow: 'hidden' }}
                                    />
                                </div>

                                <div className="position-absolute top-0" style={{ right: 12 }}>
                                    <button onClick={() => onDeleteFileHandler(img.id)} className="btn p-0 btn-outline-danger border-0" style={{ width: 27 }}>
                                        <i className="bi bi-x-circle" style={{ fontSize: 20 }}></i>
                                    </button>
                                </div>


                            </div>
                        </div>

                    </>
                ))}
            </div >
        </>
    );


}

export default ProductFileInputGroup;
