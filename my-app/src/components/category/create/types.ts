export interface ICategoryCreate {
    "id": number,
    "name": string,
    "priority": number|null,
    "image": string,
    "description": string,
    "parentId": number|null|undefined
}