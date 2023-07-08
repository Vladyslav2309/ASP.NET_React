import ProductFileInputGroup from "../../product/common/ProductFileImputGroup";
import {useState} from "react";
import {IUploadImageResult} from "../types";


const ProductCreatePage = () => {
    const [images, setImages] = useState<IUploadImageResult[]>([]);
    // Функція, для оновлення масиву зображень
    const updateImages = (newImages: IUploadImageResult[]) => {
        setImages(newImages);
    };
    return (
        <>
            <h1 className={"text-center"}>Додати товар</h1>
            <div>
                <ProductFileInputGroup images={images} setImages={updateImages}></ProductFileInputGroup>

            </div>
        </>
    );
}

export default ProductCreatePage;
