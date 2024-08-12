import config from '~/config';
import AdminLayout from '~/layouts/AdminLayouts/AdminLayout';

import HomeAdmin from '~/pages/Home/index';

import Login from '~/pages/Account/login';
import Register from '~/pages/Account/register';

// Public routes
export const publicRoutes = [
    //      Home
    { path: config.routes.admin, component: HomeAdmin, layout: AdminLayout },
   
    // Account
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },

];

// Private routes
export const privateRoutes = [];
