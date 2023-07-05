export interface ICategoryCreate {

    "name": string,
    "priority": number|null,
    "image": string,
    "description": string,
    "parentId": number|null|undefined
}