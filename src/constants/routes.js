export const path_list = {
    DASHBOARD: "/",
    REGISTER: "/register",
    LOGIN: "/login",
    PROFILE: "/user",
    FRIDGE: "/user/fridge",
    FRIDGE_NEW_PRODUCT: "/user/fridge/new-product"
}

export default [
    {
        path: path_list.DASHBOARD,
        exact: true
    },
    {
        path: path_list.PROFILE,
        exact: true
    },
    {
        path: path_list.FRIDGE,
        exact: true
    }
];