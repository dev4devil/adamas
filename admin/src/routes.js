import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import CreateForm from "views/CreateForm.js";
import AddProduct from "views/AddProduct";
import AddCategory from "views/AddCategory";
import Categories from "views/Categories";
import Products from "views/Products";
import AddUser from "views/AddUser";
import Users from "views/Users";
import UpdateUser from "views/UpdateUser";
import UpdateCategory from "views/UpdateCategory";
import UpdateProduct from "views/UpdateProduct";
import Login from "components/auth/login";
import { useSelector } from "react-redux";
import Orders from "views/orders";
import Payment from "views/payment";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    bool: true,
  },
  {
    path: "/updateuser/:id",
    name: "Update User",
    icon: "nc-icon nc-circle-09",
    component: UpdateUser,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/adduser",
    name: "Add User",
    icon: "nc-icon nc-circle-09",
    component: AddUser,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/user",
    name: "User",
    icon: "nc-icon nc-circle-09",
    component: Users,
    layout: "/admin",
    bool: true,
  },
  {
    path: "/create",
    name: "Create Form",
    icon: "nc-icon nc-circle-09",
    component: CreateForm,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/addproduct",
    name: "Add Product",
    icon: "nc-icon nc-simple-add",
    component: AddProduct,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/updateproduct/:id",
    name: "Update Product",
    icon: "nc-icon nc-simple-add",
    component: UpdateProduct,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/product",
    name: "Product",
    icon: "nc-icon nc-grid-45",
    component: Products,
    layout: "/admin",
    bool: true,
  },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-bullet-list-67",
    component: Categories,
    layout: "/admin",
    bool: true,
  },
  {
    path: "/addcategory",
    name: "Add Category",
    icon: "nc-icon nc-bullet-list-67",
    component: AddCategory,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/updatecategory/:id",
    name: "Update Category",
    icon: "nc-icon nc-bullet-list-67",
    component: UpdateCategory,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-app",
    component: Orders,
    layout: "/admin",
    bool: true,
  },
  {
    path: "/order/:id",
    name: "Orders",
    icon: "nc-icon nc-app",
    component: Orders,
    layout: "/admin",
    bool: false,
  },
  {
    path: "/payment",
    name: "Payment",
    icon: "nc-icon nc-credit-card",
    component: Payment,
    layout: "/admin",
    bool: true,
  },
];

export default dashboardRoutes;
