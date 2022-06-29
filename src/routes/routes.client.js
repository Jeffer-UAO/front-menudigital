import { ClientLayout, BasicLayout } from "../layouts";
import {
  Home,
  SelectTable,
  Categories,
  Product,
  Detail,
  Cart,
  OrdersHistory,
} from "../pages/Client";

const routesClient = [
  {
    path: "/:params",
    layout: BasicLayout,
    component: Home,
    exact: true,
  },
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
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
];

export default routesClient;
