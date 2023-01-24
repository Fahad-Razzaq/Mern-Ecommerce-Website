import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
} from "./productRedux";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, reset, updateProductFailure, updateProductStart, updateProductSuccess } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);

    if (res.data != "User Does not Exists.") {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(loginFailure());
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

// export const getProducts = async (dispatch) => {
//   dispatch(getProductStart());
//   try {
//     const res = await publicRequest.get("/product/findproducts");
//     dispatch(getProductSuccess(res.data));
//   } catch (err) {
//     dispatch(getProductFailure());
//   }
// };
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };

  export const updateProduct = async (id, dispatch) => {
    dispatch(updateProductStart());
    try {
      dispatch(updateProductSuccess(id));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };

  export const resetCart = async (dispatch) => {
    try{
      dispatch(reset());
    }catch(err){
      console.log(err)
    }
  };
