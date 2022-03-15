import {ProductType, setUsersAC, ThunkType, UsersPageType, UserType} from "./UsersReducer";
import {Dispatch} from "redux";
import {userApi, usersApi} from "../../m3-dal/usersAPI";


export const initialState = {
    id: '1',
    name: '',
    age: 0,
    avatar: '',
    company: {name: '', date: ''}

}


export const userReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'USER-SET-USER': {
            return {
                ...action.user
            }
        }
        default:
            return state
    }

}

//actionCreators
export const setUserAC = (user: UserType) => ({type: 'USER-SET-USER', user} as const)


export const getUserThunk = (userId: string): ThunkType => {
    return async (dispatch: Dispatch) => {
        const data = await userApi.getUser(userId)
        console.log(data)
        dispatch(setUserAC(data.data))
        // dispatch(setTotalUsersCountAC(data.data.totalCount))
    }
}


//types

type ActionsType = ReturnType<typeof setUserAC>
type InitialStateType = typeof initialState
