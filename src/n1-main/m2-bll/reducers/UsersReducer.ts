import {Dispatch} from "redux";
import { usersApi } from "../../m3-dal/usersAPI";

const initialState: UsersPageType = {
    users: [],
    pageSize: 5,  // столько юзеров будет на 1 страничке
    totalCount: 0,  // всего юзеров на странице
    currentPage: 2, // текущая страница
    followInProgress: []

}

export const usersReducer = (state: UsersPageType, action: any) => {
    switch (action.type) {
        case 'USERS-SET-USERS': {
            return {
                ...state,
                users: [...action.newUsers]
            }
        }
        case 'USERS-SET-CURRENT-PAGE': {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case 'USERS-SET-TOTAL-USERS-COUNT': {
            return {
                ...state, totalCount: action.usersCount
            }
        }
    }
}

//actionCreators
export const setUsersAC = (users: UserType[]) => ({type: 'USERS-SET-USERS', users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'USERS-SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCountAC = (usersCount: number) => ({type: 'USERS-SET-TOTAL-USERS-COUNT', usersCount} as const)



//thunks
export const getUsersThunk = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        const data = await usersApi.getUsers(currentPage, pageSize)
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
    }
}



//types
type ActionTypes =
    | ReturnType<typeof setUsersAC>



export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalCount: number
    currentPage: number
    followInProgress: any
}

export type UserType = {
    id: string
    name: string
    age: number
    avatar: string
    company: { name: string, date: string }
}

export type ProductType = {
    id: string
    name: string
    userId: string
}