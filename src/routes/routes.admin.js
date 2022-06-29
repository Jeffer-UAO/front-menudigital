import { AdminLayout } from "../layouts";
//import { Error404 } from "../pages";
import {
  OrdersAdmin,
  UserAdmin,
  CategoriesAdmin,
  ProductsAdmin,
  TablesAdmin,
  TableDetailsAdmin,
  PaymentsHistory,
  CardAdmin,
  SauceAdmin,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin/orders",
    layout: AdminLayout,
    component: OrdersAdmin,
    exact: true,
  },
  {
    path: "/admin/sauce",
    layout: AdminLayout,
    component: SauceAdmin,
    exact: true,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UserAdmin,
    exact: true,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
    exact: true,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductsAdmin,
    exact: true,
  },
  {
    path: "/admin/products/car",
    layout: AdminLayout,
    component: CardAdmin,
    exact: true,
  },
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: TablesAdmin,
    exact: true,
  },
  {
    path: "/admin/table/:id",
    layout: AdminLayout,
    component: TableDetailsAdmin,
    exact: true,
  },
  {
    path: "/admin/payments-history",
    layout: AdminLayout,
    component: PaymentsHistory,
    exact: true,
  },
];

export default routesAdmin;
