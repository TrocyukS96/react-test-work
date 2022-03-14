import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://621c7b30768a4e1020ab3244.mockapi.io/api/',
})
export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&limit=${pageSize}`, {
            withCredentials: true
        }).then(response => response.data)
    },
}