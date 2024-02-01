import {
  FETCH_PRODUCT_DETAIL_FAILURE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  SET_SELECTED_SNEAKER_INDEX,
  CLEAR_CREATE_PRODUCT_STATE,
  UPDATE_SELECTED_SNEAKER,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  POST_PRODUCT_REQUEST,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILURE,
  CLEAR_PRODUCT_DETAIL,
  GET_ALL_SNEAKERS,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_NOTFOUND,
  RESET_CURRENTPAGE,
  BRAND_VALUE,
  COLOR_VALUE,
  ORDER_PRICE,
  SET_REVIEWS,
  SIZE_VALUE,
  STATE_DATA_PAGE,
  SET_ADMIN,
  SET_SELECTED_IMAGE_INDEX,
  LOGIN_USER,
  POST_CART_ITEMS,
  GET_ALL_ITEMS,
  REMOVE_FROM_CART,
  REVIEW_POST_REQUEST,
  REVIEW_POSTED_SUCCESS,
  REVIEW_POSTED_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAILURE,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USER_PAYMONTH_FAILURE,
  UPDATE_USER_PAYMONTH_SUCCESS,
  UPDATE_USER_PAYMONTH_REQUEST,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_ADMIN_REQUEST,
  UPDATE_USER_ADMIN_SUCCESS,
  UPDATE_USER_ADMIN_FAILURE,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_FAILURE,
} from "../action-types/action-types";

const initialState = {
  loading: false,
  product: {
    detail: null,
    createdProduct: null,
    loading: false,
    error: null,
  },
  error: null,
  sneakers: [],
  allCopySneakers: [],
  currentPage: [],
  totalSneakers: [],
  brandValue: [],
  colorValue: [],
  sizeValue: [],
  orderPrice: [],
  dataSearch: [],
  reviews: [],
  postingReview: false,
  postReviewError: null,
  postReviewSuccess: false,
  selectedImageIndex: [],
  login: {},
  auth: {
    loading: false,
  },
  passwordAndEmailUpdating: false,
  passwordAndEmailUpdateError: null,
  searchLoading: false,
  searchError: null,
  searchData: null,
  isAdmin: false,
  updateUserError: null,
  profilePicture: "",
  isUpdatingProfilePicture: false,
  updateProfilePictureError: null,
  users: [],
  updatingUserAdmin: false,
  updateUserAdminError: null,
  shoppingItems: [],
  products: [],
};

const stateSearchBar = {
  data: null,
  page: 0,
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };

    case POST_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        product: null,
        error: action.payload,
      };

    case GET_ALL_SNEAKERS:
      return {
        ...state,
        sneakers: action.payload.sneakers,
        allCopySneakers: action.payload.sneakers,
        currentPage: action.payload.currentPage,
        totalSneaker: action.payload.totalSneaker,
        page: 0,
        selectedImageIndex: [],
      };

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      console.log("Detalle del producto:", action.payload);
      return {
        ...state,
        product: {
          ...state.product,
          detail: action.payload,
        },
        error: null,
      };

    case FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        product: {
          ...state.product,
          detail: null,
        },
        error: action.payload,
      };

    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: {
          ...state.product,
          detail: null,
        },
      };

    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        createdProduct: action.payload,
        error: null,
      };

    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        createdProduct: null,
        error: action.payload,
      };

    case CLEAR_CREATE_PRODUCT_STATE:
      return { ...initialState };

    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        sneakers: action.payload.sneakers,
        page: action.payload.currentPage,
        totalSneaker: action.payload.totalSneaker,
      };

    case GET_SEARCH_NOTFOUND:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    case RESET_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case BRAND_VALUE:
      return {
        ...state,
        brandValue: action.payload,
        dataSearch: [],
      };

    case COLOR_VALUE:
      return {
        ...state,
        colorValue: action.payload,
      };

    case SIZE_VALUE:
      return {
        ...state,
        sizeValue: action.payload,
      };

    case ORDER_PRICE:
      return {
        ...state,
        orderPrice: action.payload,
      };

    case STATE_DATA_PAGE:
      return {
        ...state,
        dataSearch: action.payload,
      };

    case "RESET_SEARCH":
      return {
        ...state,
        sneakers: state.allCopySneakers,
      };

    case UPDATE_SELECTED_SNEAKER:
      return {
        ...state,
        selectedSneaker: action.payload,
      };

    case SET_SELECTED_SNEAKER_INDEX:
      return {
        ...state,
        selectedSneakerIndex: action.payload,
      };

    case GET_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SET_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };

    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case REVIEW_POST_REQUEST:
      return {
        ...state,
        postingReview: true,
        postReviewError: null,
        postReviewSuccess: false,
      };
    case REVIEW_POSTED_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        postingReview: false,
        postReviewSuccess: true,
      };
    case REVIEW_POSTED_FAILURE:
      return {
        ...state,
        postingReview: false,
        postReviewError: action.payload,
        postReviewSuccess: false,
      };

    case SET_SELECTED_IMAGE_INDEX:
      return {
        ...state,
        selectedImageIndex: action.payload,
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        passwordAndEmailUpdating: true,
        passwordAndEmailUpdateError: null,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordAndEmailUpdating: false,
      };

    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        passwordAndEmailUpdating: false,
        passwordAndEmailUpdateError: action.payload,
      };

    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        isUpdatingProfilePicture: true,
        updateProfilePictureError: null,
      };

    case UPDATE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        profilePicture: action.payload,
        isUpdatingProfilePicture: false,
        updateProfilePictureError: null,
      };

    case UPDATE_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        isUpdatingProfilePicture: false,
        updateProfilePictureError: action.payload,
      };
    //caso para subir la imagen a cloudinary
    case UPDATE_PROFILE_PICTURE:
      const { userId, data } = action.payload;
      const updatedUsers = state.users.map((user) =>
        user.id === userId
          ? { ...user, profilePicture: data.profilePicture }
          : user
      );

    case UPDATE_USER_PAYMONTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case UPDATE_USER_PAYMONTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case UPDATE_USER_PAYMONTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_USER_ADMIN_REQUEST:
      return {
        ...state,
        updatingUserAdmin: true,
        updateUserAdminError: null,
      };

    case UPDATE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        updatingUserAdmin: false,
        updateUserAdminError: null,
      };

    case UPDATE_USER_ADMIN_FAILURE:
      return {
        ...state,
        updatingUserAdmin: false,
        updateUserAdminError: action.payload,
      };

    case POST_CART_ITEMS:
      return {
        ...state,
        itemsCart: action.payload,
      };

    case GET_ALL_ITEMS:
      return {
        ...state,
        shoppingItems: action.payload || [],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        shoppingItems: state.shoppingItems.filter(
          (item) => item.productId !== action.payload?.productId
        ),
      };

    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
