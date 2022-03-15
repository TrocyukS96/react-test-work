import {ProductType, ThunkType, UserType} from "./UsersReducer";
import {Dispatch} from "redux";
import {userApi} from "../../m3-dal/usersAPI";


const initialState = {
    person: {
        id: '',
        name: '',
        age: 0,
        avatar: '',
        company: {name: '', date: '',}
    },
    products: [],
    status: 'succeeded' as RequestStatusType,
}


export const userReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'USER-SET-USER': {
            return {
                ...state, person: action.user
            }
        }
        case 'USER-SET-PRODUCTS': {
            return {
                ...state, products: [action.products]
            }
        }
        case'USER-SET-STATUS': {
            return {
                ...state, status: action.status
            }
        }

        default:
            return state
    }

}

//actionCreators
export const setUserAC = (user: UserType) => ({type: 'USER-SET-USER', user} as const)
export const setProductsAC = (products: ProductType[]) => ({type: 'USER-SET-PRODUCTS', products} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'USER-SET-STATUS', status} as const)


export const getUserThunk = (userId: string): ThunkType => {
    return async (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        const data = await userApi.getUser(userId)
        dispatch(setUserAC(data.data))
        dispatch(setStatusAC('succeeded'))
    }
}
export const updateUserThunk = (userId: string, payload: { name: string, age: number }): ThunkType => {
    return async (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        await userApi.updateUser(userId, payload)
        dispatch(setStatusAC('succeeded'))


    }
}
export const getProductsThunk = (userId: string): ThunkType => {
    return async (dispatch: Dispatch) => {
        dispatch(setStatusAC('succeeded'))
        const data = await userApi.getProducts(userId)
        dispatch(setProductsAC(data.data))
        dispatch(setStatusAC('succeeded'))
    }
}
export const deleteProductsThunk = (userId: string, id: string): ThunkType => {
    return async (dispatch) => {
        // @ts-ignore
        dispatch(setStatusAC('loading'))
        await userApi.deleteProducts(userId, id)
        dispatch(getProductsThunk(userId))
        // @ts-ignore
        dispatch(setStatusAC('succeeded'))
    }
}


//types

type ActionsType =
    | ReturnType<typeof setUserAC>
    | ReturnType<typeof setProductsAC>
    | SetStatusAT

export type SetStatusAT = ReturnType<typeof setStatusAC>


type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
