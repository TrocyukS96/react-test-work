import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {usersReducer} from "./reducers/UsersReducer";


const reducers = combineReducers({
    users:usersReducer,
})


export type RootStateType = ReturnType<typeof reducers>
export const store: Store = createStore(reducers, applyMiddleware(thunk));

// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown,any>