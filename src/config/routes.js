const routes = {
    admin: '/',
    chart: '/chart',

    //      Account
    login: '/login',

    //      Category
    category: '/category',
    createCategory: '/Category/create',
    editCategory: '/Category/edit/:id',

    //      products
    product: '/product',
    createProduct: '/product/create',
    editProduct: '/product/edit/:id',

    favoriteProducts: '/favorite',

    detailProduct: '/product/detail/:productId',
    createProductDetails: '/product/detail/create',
    editProductDetails: '/product/detail/edit/:id',
    //      Orders
    orders: '/order',
    orderDetail: '/order/detail/:id',
    invoice: '/order/invoice/:id',

    // feedbacks: '/feedbacks',
    feedbacks: '/product/feedbacks/:productId',
    feedbackDetail: '/products/feedbacks/detail/:id',

    //      Manager
    calendar: '/calendar',
    calendars: '/calendars',
    error_404: '/error_404',

    //      Users
    users: '/users',
    createUsers: '/users/create',
    editUsers: '/users/edit/:id',

    admins: '/admins',
    createAdmins: '/admins/create',
    editAdmins: '/admins/edit/:id',

    profile: '/profile',
};

export default routes;
