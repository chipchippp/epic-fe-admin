import config from '~/config';
import AdminLayout from '~/layouts/AdminLayouts/AdminLayout';

import HomeAdmin from '~/pages/Home/index';

// Account
import Login from '~/pages/Account/login';
import Register from '~/pages/Account/register';

// Category
import Category from '~/pages/Category/index';
// import CategoryCreate from '~/pages/Category/create';
// import CategoryEdit from '~/pages/Category/edit';

// Product
import Product from '~/pages/Product/index';

// Order
import Order from '~/pages/Order/index';

// Chart
import Chart from '~/pages/Chart/index';

// Public routes
export const publicRoutes = [
    //      Home
    { path: config.routes.admin, component: HomeAdmin, layout: AdminLayout },
   
    // Account
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },

    // Category
    { path: config.routes.category, component: Category, layout: AdminLayout },

    // Product
    { path: config.routes.product, component: Product, layout: AdminLayout },

    // Order
    {path: config.routes.orders, component: Order, layout: AdminLayout},

    // Chart
    { path: config.routes.chart, component: Chart, layout: AdminLayout },

];

// Private routes
export const privateRoutes = [];
