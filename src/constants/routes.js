import NewProduct from "../Pages/NewProduct";
import FridgesList from "../Pages/FridgesList/FridgesList";
import ProductsList from "../Pages/ProductsList/ProductsList"
import UserPage from "../Pages/UserPage/UserPage";
import LoginPage from "Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";

export const path_list = {
    DASHBOARD: {
        route: "/",
        name: "Dashboard"
    },
    REGISTER: {
        route: "/register",
        name: "Register"
    },
    LOGIN: {
        route: "/login",
        name: "Log in"
    },
    PROFILE: {
        route: "/user",
        name: "My profile"
    },
    FRIDGE_LIST: {
        route: "/user/fridge",
        name: "My fridge list"
    },
    FRIDGE: {
        route: "/user/fridge/:fridge_id",
        redirect: (fridge_id) => `/user/fridge/${fridge_id}`,
        name: "My fridge"
    },
    FRIDGE_NEW_PRODUCT: {
        route: "/user/fridge/:fridge_id/new-product",
        redirect: (fridge_id) => `/user/fridge/${fridge_id}/new-product`,
        name: "Add product"
    },
}

export default [
    {
        path: path_list.FRIDGE.route,
        component: ProductsList,
        exact: true,
        requiresLogin: true
    },
    {
        path: path_list.LOGIN.route,
        component: LoginPage,
        exact: true,
        requiresLogin: false
    },
    {
        path: path_list.REGISTER.route,
        component: RegisterPage,
        exact: true,
        requiresLogin: false
    },
    {
        path: path_list.PROFILE.route,
        exact: true,
        component: UserPage,
        requiresLogin: true
    },
    {
        path: path_list.FRIDGE_LIST.route,
        exact: true,
        component: FridgesList,
        requiresLogin: true
    },
    {
        path: path_list.FRIDGE_NEW_PRODUCT.route,
        component: NewProduct,
        exact: true,
        requiresLogin: true
    }
];

