import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {usersReducer} from "./reducers/UsersReducer";
import {userReducer} from "./reducers/userReducer";


const reducers = combineReducers({
    users:usersReducer,
    user:userReducer
})


export type RootStateType = ReturnType<typeof reducers>
export const store: Store = createStore(reducers, applyMiddleware(thunk));

// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown,any>