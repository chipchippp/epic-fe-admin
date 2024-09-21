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
    
    productdetail: '/productdetail/:id',
    createProduct: '/addcreate',
    editProduct: '/editproduct/:id',

    //      Inventory
    inventory: '/inventory',
    createInventory: '/inventory/create',
    editInventory: '/inventory/edit/:id',

    //     Blog
    blog: '/blog',
    createBlog: '/blog/create',
    editBlog: '/blog/edit/:id',

    //     Designer
    designer: '/designer',
    detailDesigner: '/designer/detail/:id',
    profile: '/profile',
   
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

    //      Users
    users: '/users',
    createUsers: '/users/create',
    editUsers: '/users/edit/:id',
    userdetail: '/users/detail/:userId',

    admins: '/admins',
    createAdmins: '/admins/create',
    editAdmins: '/admins/edit/:id',

    profile: '/profile',

    //      Trash
    trashCategories: '/trash/categories',
    trashProducts: '/trash/products',
};

export default routes;
