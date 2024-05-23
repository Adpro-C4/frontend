export type UserDTO = {
    id?:number,
    role: string,
    username: string,
    password: string,
    email: string,
    name?: string,
    phoneNumber?: string
}