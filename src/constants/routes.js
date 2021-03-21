import NewProduct from "../Pages/NewProduct";
import FridgesList from "../Pages/FridgesList/FridgesList";
import ProductsList from "../Pages/ProductsList/ProductsList"
import UserPage from "../Pages/UserPage/UserPage";
import LoginPage from "Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import RecipesList from "../Pages/RecipesList/RecipesList";
import RecipesList2 from "../Pages/RecipesList/RecipesList2";

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
    SETTINGS: {
        route: "/settings",
        name: "Settings"
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
        redirect: (fridge_id) => `/user/${fridge_id}/new-product`,
        name: "Add product"
    },
    FRIDGE1_NEW_PRODUCT: {
        route: "/user/fridge/1/new-product",
        name: "Add product"
    },
    FRIDGE1: {
        route: "/user/fridge/1",
        name: "Add product"
    },
    RECIPES_LIST: {
        route: "/recipes",
        name: "Recipes list"
    },
    RECIPES_LIST2: {
        route: "/recipes2",
        name: "Recipes list2"
    },
    RECIPE_PAGE: {
        route: "/recipes/:recipe_id",
        redirect: (recipe_id) => `/recipes/${recipe_id}`,
        name: "Recipe details"
    },
}

export default [
    {
        path: path_list.FRIDGE.route,
        component: ProductsList,
        exact: true
    },
    {
        path: path_list.LOGIN.route,
        component: LoginPage,
        exact: true
    },
    {
        path: path_list.REGISTER.route,
        component: RegisterPage,
        exact: true
    },
    {
        path: path_list.PROFILE.route,
        exact: true,
        component: UserPage
    },
    {
        path: path_list.FRIDGE_LIST.route,
        exact: true,
        component: FridgesList
    },
    {
        path: path_list.FRIDGE_NEW_PRODUCT.route,
        component: NewProduct,
        exact: true
    },
    {
        path: path_list.RECIPES_LIST.route,
        component: RecipesList2,
        exact: true
    },
    {
        path: path_list.RECIPES_LIST2.route,
        component: RecipesList,
        exact: true
    },
    {
        path: path_list.RECIPE_PAGE.route,
        exact: true
    },
];

