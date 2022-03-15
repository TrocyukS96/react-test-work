import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://621c7b30768a4e1020ab3244.mockapi.io/api/',
})
export const usersApi = {
    getUsers(currentPage: number, pageSize=5) {
        return instance.get(`users?page=${currentPage}&limit=${pageSize}`)
    },
    deleteUsers(userId:string) {
        return instance.delete(`users/${userId}`)
    },
}
export const userApi = {
    getUser(userId:string) {
        return instance.get(`users/${userId}`)
    },
    getProducts(userId:string) {
        return instance.get(`products/${userId}`)
    },
    deleteProducts(userId:string, productId:string) {
        return instance.delete(`products/${productId}`)
    },

}

