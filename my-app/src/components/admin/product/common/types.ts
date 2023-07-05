//фото, для товару
export interface IUploadImage {
    image: File|null;
}
//інформація про фото, яке завантажили на сервер
export interface IUploadImageResult {
    id: number;
    name: string;
}
