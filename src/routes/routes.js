import config from '~/config';
import AdminLayout from '~/layouts/AdminLayouts/AdminLayout';

import HomeAdmin from '~/pages/Home/index';

// Account
import Login from '~/pages/Account/login';

// Category
import Category from '~/pages/Category/index';
import CategoryCreate from '~/pages/Category/create';
import CategoryEdit from '~/pages/Category/edit';

// Product
import Product from '~/pages/Product/index';
import CreateProduct from '~/pages/Product/create';
import ProductDetail from '~/pages/Product/productdetail';
import EditProduct from '~/pages/Product/editproduct';

// Inventory
import Inventory from '~/pages/Inventory/index';
import InventoryCreate from '~/pages/Inventory/create';

// Blog
import Blog from '~/pages/Blog/index';
import BlogCreate from '~/pages/Blog/create';
import BlogEdit from '~/pages/Blog/edit';

// Order
import Order from '~/pages/Order/index';
import OrderDetail from '~/pages/Order/details';

// Chart
import Chart from '~/pages/Chart/index';

// User
import User from '~/pages/User/index';
import UserCreate from '~/pages/User/create';
import UserEdit from '~/pages/User/edit';
import UserDetail from '~/pages/User/userdetail';

// Trash
import TrashCategory from '~/pages/Trash/category';
import TrashProduct from '~/pages/Trash/product';

// Public routes
export const publicRoutes = [
    //      Home
    { path: config.routes.admin, component: HomeAdmin, layout: AdminLayout },
   
    // Account
    { path: config.routes.login, component: Login, layout: null },

    // Category
    { path: config.routes.category, component: Category, layout: AdminLayout },
    { path: config.routes.createCategory, component: CategoryCreate, layout: AdminLayout },
    { path: config.routes.editCategory, component: CategoryEdit, layout: AdminLayout },

    // Product
    { path: config.routes.product, component: Product, layout: AdminLayout },
    { path: config.routes.createProduct, component: CreateProduct, layout: AdminLayout },
    { path: config.routes.editProduct, component: EditProduct, layout: AdminLayout },
    { path: config.routes.productdetail, component: ProductDetail, layout: AdminLayout },

    // Inventory
    {path: config.routes.inventory, component: Inventory, layout: AdminLayout},
    {path: config.routes.createInventory, component: InventoryCreate, layout: AdminLayout},
    // Blog
    {path: config.routes.blog, component: Blog, layout: AdminLayout},
    {path: config.routes.createBlog, component: BlogCreate, layout: AdminLayout},
    {path: config.routes.editBlog, component: BlogEdit, layout: AdminLayout},

    // Order
    {path: config.routes.orders, component: Order, layout: AdminLayout},
    {path: config.routes.orderDetail, component: OrderDetail, layout: AdminLayout},

    // Chart
    { path: config.routes.chart, component: Chart, layout: AdminLayout },

    // User
    { path: config.routes.users, component: User, layout: AdminLayout },
    { path: config.routes.createUsers, component: UserCreate, layout: AdminLayout },
    { path: config.routes.editUsers, component: UserEdit, layout: AdminLayout },
    { path: config.routes.userdetail, component: UserDetail, layout: AdminLayout },

    // Trash
    {path: config.routes.trashCategories, component: TrashCategory, layout: AdminLayout},
    {path: config.routes.trashProducts, component: TrashProduct, layout: AdminLayout},
];

// Private routes
export const privateRoutes = [];
