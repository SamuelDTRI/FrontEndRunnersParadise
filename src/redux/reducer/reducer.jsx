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
  REVIEW_POSTED_FAILURE,
  REVIEW_POSTED_SUCCESS,
  REVIEW_POST_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types/action-types";

const initialState = {
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
  loading: false,
  error: null,
  auth: {
    loading: false,
  },
  passwordAndEmailUpdating: false,
  passwordAndEmailUpdateError: null,
  searchLoading: false,
  searchError: null,
  searchData: null,
  isAdmin: true,
  updateUserError: null,
};
const stateSearchBar = {
  data: null,
  page: 0,
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          userData: action.payload,
        },
      };

    case LOGOUT:
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          userData: null,
        },
      };

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

    default:
      return state;
  }
};

export default productReducer;
