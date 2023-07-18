import { ClientLayout, BasicLayout } from "../layouts";
import {
  SelectTable,
  Categories,
  Product,
  Detail,
  Cart,
  OrdersHistory,
  Sauces,
  Login,
  Register,
} from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
    exact: true,
  },
  {
    path: "/login",
    layout: BasicLayout,
    component: Login,
    exact: true,
  },
  {
    path: "/register",
    layout: BasicLayout,
    component: Register,
    exact: true,
  },
  {
    path: "/client/:tableNumber",
    layout: ClientLayout,
    component: Categories,
    exact: true,
  },
  {
    path: "/client/:tableNumber/cart",
    layout: ClientLayout,
    component: Cart,
    exact: true,
  },
  {
    path: "/client/:tableNumber/orders",
    layout: ClientLayout,
    component: OrdersHistory,
    exact: true,
  },
  {
    path: "/client/:tableNumber/:idCategory",
    layout: ClientLayout,
    component: Product,
    exact: true,
  },
  {
    path: "/client/:tableNumber/:idCategory/:idProduct",
    layout: ClientLayout,
    component: Detail,
    exact: true,
  },
  {
    path: "/client/:tableNumber/:idCategory/:idProduct/:sauce",
    layout: ClientLayout,
    component: Sauces,
    exact: true,
  },
];

export default routesClient;
