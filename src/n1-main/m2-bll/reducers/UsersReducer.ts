import {Dispatch} from "redux";
import { ThunkAction } from "redux-thunk/es/types";
import { usersApi } from "../../m3-dal/usersAPI";
import { RootStateType } from "../store";
import {setStatusAC, SetStatusAT} from "./userReducer";

const initialState: UsersPageType = {
    users: [],
    pageSize: 5,  // столько юзеров будет на 1 страничке
    totalCount: 40,  // всего юзеров на странице
    currentPage: 1, // текущая страница
    portionSize:5,
    userId:''
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
        case 'USERS/SET-VALUE-SEARCH':
            return {...state, users: state.users.filter(n=>n.name===action.value)}
        case 'USERS/SORT-USERS':
            return {...state, sortCards: action.value}
        case 'USERS/SET-USER-ID':
            return {...state, userId: action.userId}
        default:
            return state
    }
}

//actionCreators
export const setUsersAC = (users: UserType[]) => ({type: 'USERS-SET-USERS', users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'USERS-SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCountAC = (usersCount: number) => ({type: 'USERS-SET-TOTAL-USERS-COUNT', usersCount} as const)
export const setPortionSizeAC = (portionSize: number) => ({type: 'USERS-SET-PORTION-SIZE', portionSize} as const)
export const setValueSearchAC = (value: string) => ({type: 'USERS/SET-VALUE-SEARCH', value} as const)
export const sortUsersAC = (value: string) => ({type: 'USERS/SORT-USERS', value} as const)
export const setUserIdAC = (userId: string) => ({type: 'USERS/SET-USER-ID', userId} as const)

//thunks
export const getUsersThunk = (currentPage: number, pageSize?: number):ThunkType => {
    return async (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        const data = await usersApi.getUsers(currentPage, pageSize)
        dispatch(setUsersAC(data.data))
        dispatch(setStatusAC('succeeded'))
    }
}
export const deleteUsersThunk = (userId: string):ThunkType=> async (dispatch, getState) => {
    const currentPage = getState().users.currentPage
    dispatch(setStatusAC('loading'))
    await usersApi.deleteUsers(userId)
    dispatch(getUsersThunk(currentPage))
    dispatch(setStatusAC('succeeded'))
}


//types
type ActionTypes =
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof setPortionSizeAC>
    | ReturnType<typeof setValueSearchAC>
    | ReturnType<typeof sortUsersAC>
    | ReturnType<typeof setUserIdAC>
    | SetStatusAT



export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalCount: number
    currentPage: number
    portionSize:number
    userId:string
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

export type ThunkType = ThunkAction<any, RootStateType, {}, ActionTypes>
