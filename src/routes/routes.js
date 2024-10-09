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
import Inventory from '~/pages/Inventory/Inventory/index';
import InventoryCreate from '~/pages/Inventory/Inventory/create';
import InventoryEdit from '~/pages/Inventory/Inventory/edit';

// Inventory Status
import InventoryStatus from '~/pages/Inventory/Inventory-Status/index';
import InventoryStatusCreate from '~/pages/Inventory/Inventory-Status/create';
import InventoryStatusEdit from '~/pages/Inventory/Inventory-Status/edit';

// Blog
import Blog from '~/pages/Blog/index';
import BlogCreate from '~/pages/Blog/create';
import BlogEdit from '~/pages/Blog/edit';

// Designer
import Designer from '~/pages/Designer/Designer/index';
import DesignerDetail from '~/pages/Designer/Designer/details';
import DesignAppointment from '~/pages/Designer/Designer/designerAppointment';
import DesignAppointmentDetail from '~/pages/Designer/Designer/designerAppointmentDetail';

// Category Gallery
import CategoryGallery from '~/pages/Designer/CategoryGallery/index';
import CreateCategoryGallery from '~/pages/Designer/CategoryGallery/create';
import EditCategoryGallery from '~/pages/Designer/CategoryGallery/edit';

// Img Designer
import ImgDesigner from '~/pages/Designer/ImgDesigner/index';
import CreateImgDesigner from '~/pages/Designer/ImgDesigner/create';
import EditImgDesigner from '~/pages/Designer/ImgDesigner/edit';

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
    { path: config.routes.inventory, component: Inventory, layout: AdminLayout },
    { path: config.routes.createInventory, component: InventoryCreate, layout: AdminLayout },
    { path: config.routes.editInventory, component: InventoryEdit, layout: AdminLayout },

    // Inventory Status
    {path: config.routes.inventoryStatus, component: InventoryStatus, layout: AdminLayout},
    {path: config.routes.createInventoryStatus, component: InventoryStatusCreate, layout: AdminLayout},
    {path: config.routes.editInventoryStatus, component: InventoryStatusEdit, layout: AdminLayout},

    // Blog
    { path: config.routes.blog, component: Blog, layout: AdminLayout },
    { path: config.routes.createBlog, component: BlogCreate, layout: AdminLayout },
    { path: config.routes.editBlog, component: BlogEdit, layout: AdminLayout },

    // Designer
    { path: config.routes.designer, component: Designer, layout: AdminLayout },
    { path: config.routes.detailDesigner, component: DesignerDetail, layout: AdminLayout },
    { path: config.routes.designerAppointment, component: DesignAppointment, layout: AdminLayout },
    { path: config.routes.designerAppointmentDetail, component: DesignAppointmentDetail, layout: AdminLayout },

    // Category Gallery
    { path: config.routes.categoryGallery, component: CategoryGallery, layout: AdminLayout },
    { path: config.routes.createCategoryGallery, component: CreateCategoryGallery, layout: AdminLayout },
    { path: config.routes.editCategoryGallery, component: EditCategoryGallery, layout: AdminLayout },

    // Img Designer
    { path: config.routes.imgDesigner, component: ImgDesigner, layout: AdminLayout },
    { path: config.routes.createImgDesigner, component: CreateImgDesigner, layout: AdminLayout },
    { path: config.routes.editImgDesigner, component: EditImgDesigner, layout: AdminLayout },

    // Order
    { path: config.routes.orders, component: Order, layout: AdminLayout },
    { path: config.routes.orderDetail, component: OrderDetail, layout: AdminLayout },

    // Chart
    { path: config.routes.chart, component: Chart, layout: AdminLayout },

    // User
    { path: config.routes.users, component: User, layout: AdminLayout },
    { path: config.routes.createUsers, component: UserCreate, layout: AdminLayout },
    { path: config.routes.editUsers, component: UserEdit, layout: AdminLayout },
    { path: config.routes.userdetail, component: UserDetail, layout: AdminLayout },

    // Trash
    { path: config.routes.trashCategories, component: TrashCategory, layout: AdminLayout },
    { path: config.routes.trashProducts, component: TrashProduct, layout: AdminLayout },
];

// Private routes
export const privateRoutes = [];
