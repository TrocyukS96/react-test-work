import {ProductType, ThunkType, UserType} from "./UsersReducer";
import {Dispatch} from "redux";
import {userApi} from "../../m3-dal/usersAPI";


export const initialState = {
    person:{
        id: '',
        name: '',
        age:0,
        avatar: '',
        company: { name: '', date: '',}
    },
    products: []
}


export const userReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'USER-SET-USER': {
            return {
                ...state,person:action.user
                            }
        }
        case 'USER-SET-PRODUCTS': {
            return {
                ...state,products:[action.products]
            }
        }
        // case 'USER-DELETE-PRODUCTS': {
        //     return {
        //         ...state,products:state.products.filter(n=>n!==action.id)
        //     }
        // }
        default:
            return state
    }

}

//actionCreators
export const setUserAC = (user: UserType) => ({type: 'USER-SET-USER', user} as const)
export const setProductsAC = (products: ProductType[]) => ({type: 'USER-SET-PRODUCTS', products} as const)
// export const deleteProductsAC = (id: string) => ({type: 'USER-DELETE-PRODUCTS', id} as const)


export const getUserThunk = (userId: string): ThunkType => {
    return async (dispatch: Dispatch) => {
        const data = await userApi.getUser(userId)
        dispatch(setUserAC(data.data))
    }
}
export const getProductsThunk = (userId: string): ThunkType => {
    return async (dispatch: Dispatch) => {
        const data = await userApi.getProducts(userId)
        console.log(data.data)
        dispatch(setProductsAC(data.data))
    }
}
export const deleteProductsThunk = (userId:string,id: string): ThunkType => {
    return async (dispatch) => {
        const data = await userApi.deleteProducts(userId,id)
        dispatch(getProductsThunk(userId))
        console.log(data.data)
    }
}


//types

type ActionsType =
    | ReturnType<typeof setUserAC>
    | ReturnType<typeof setProductsAC>


type InitialStateType = typeof initialState
