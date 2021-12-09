import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  bookListReducer,
  booKDetailsReducer,
  bookDeleteReducer,
  bookCreateReducer,
  bookUpdateReducer,
  bookBorrowersUpdateOnBorrowReducer,
  bookBorrowersReducer,
  bookBorrowersUpdateOnReturnReducer,
} from './reducers/bookReducers'
import {
  userDeleteReducer,
  userDetailsByIdReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: booKDetailsReducer,
  bookDelete: bookDeleteReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  bookBorrowersOnBorrowUpdate: bookBorrowersUpdateOnBorrowReducer,
  bookBorrowersOnReturnUpdate: bookBorrowersUpdateOnReturnReducer,
  bookBorrowers: bookBorrowersReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDetailsById: userDetailsByIdReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})
const middleware = [thunk]

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
