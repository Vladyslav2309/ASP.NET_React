export interface ICategoryEdit {
    "id": number,
    "name": string,
    "priority": number|null,
    "imageUpload": File|null,
    "description": string,
    "parentId": number|null|undefined
}