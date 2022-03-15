import {Dispatch} from "redux";
import { usersApi } from "../../m3-dal/usersAPI";

export const initialState: UsersPageType = {
    users: [],
    pageSize: 5,  // столько юзеров будет на 1 страничке
    totalCount: 100,  // всего юзеров на странице
    currentPage: 1, // текущая страница
    portionSize:5
}

export const usersReducer = (state=initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'USERS-SET-USERS': {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case 'USERS-SET-CURRENT-PAGE': {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case 'USERS-SET-PORTION-SIZE': {
            return {
                ...state, portionSize: action.portionSize
            }
        }
        case 'USERS-SET-TOTAL-USERS-COUNT': {
            return {
                ...state, totalCount: action.usersCount
            }
        }
        default:
            return state
    }
}

//actionCreators
export const setUsersAC = (users: UserType[]) => ({type: 'USERS-SET-USERS', users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'USERS-SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCountAC = (usersCount: number) => ({type: 'USERS-SET-TOTAL-USERS-COUNT', usersCount} as const)
export const setPortionSizeAC = (portionSize: number) => ({type: 'USERS-SET-PORTION-SIZE', portionSize} as const)



//thunks
export const getUsersThunk = (currentPage: number, pageSize?: number) => {
    return async (dispatch: Dispatch) => {
        const data = await usersApi.getUsers(currentPage, pageSize)
        console.log(data)
        dispatch(setUsersAC(data.data))
        // dispatch(setTotalUsersCountAC(data.data.totalCount))
    }
}



//types
type ActionTypes =
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof setPortionSizeAC>



export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalCount: number
    currentPage: number
    portionSize:number
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