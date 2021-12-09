import {
  BOOK_LIST_SUCCESS,
  BOOK_LIST_REQUEST,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_LIST_RESET,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_BORROWERS_REQUEST,
  BOOK_BORROWERS_SUCCESS,
  BOOK_BORROWERS_FAIL,
  BOOK_BORROWERS_UPDATE_ON_BORROW_FAIL,
  BOOK_BORROWERS_UPDATE_ON_BORROW_REQUEST,
  BOOK_BORROWERS_UPDATE_ON_BORROW_SUCCESS,
  BOOK_BORROWERS_UPDATE_ON_RETURN_REQUEST,
  BOOK_BORROWERS_UPDATE_ON_RETURN_SUCCESS,
  BOOK_BORROWERS_UPDATE_ON_RETURN_FAIL,
} from '../constants/bookConstants'
import axios from 'axios'

export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST })
    const { data } = await axios.get('/api/books')
    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/books/${id}`)
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBook = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/books/${id}`, config)
    dispatch({
      type: BOOK_DELETE_SUCCESS,
    })
    dispatch({
      type: BOOK_LIST_RESET,
    })
    dispatch(listBooks())
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createBook = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const data = await axios.post(`/api/books`, {}, config)
    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const data = await axios.put(`/api/books/${book._id}`, book, config)
    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getborrowers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_BORROWERS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const data = await axios.get(`/api/books/borrowers`, config)
    dispatch({
      type: BOOK_BORROWERS_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_BORROWERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBorrowersOnBorrow =
  (bookid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_BORROWERS_UPDATE_ON_BORROW_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.get(`/api/books/${bookid}/borrowers`, config)
      dispatch({
        type: BOOK_BORROWERS_UPDATE_ON_BORROW_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BOOK_BORROWERS_UPDATE_ON_BORROW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateBorrowersOnReturn =
  (bookid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_BORROWERS_UPDATE_ON_RETURN_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.get(`/api/books/${bookid}/return`, config)
      dispatch({
        type: BOOK_BORROWERS_UPDATE_ON_RETURN_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BOOK_BORROWERS_UPDATE_ON_RETURN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
