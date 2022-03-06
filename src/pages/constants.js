import Authorization from "@components/Authorization";
import React, { Suspense } from "react";

// home page
const Home = React.lazy(() => import("@src/pages/user/home"));
const Restaurant = React.lazy(() => import("@src/pages/user/restaurant"));
const DetailRestaurant = React.lazy(() =>
  import("@src/pages/user/detail-restaurant")
);
const Chat = React.lazy(() => import("@src/pages/user/chat"));

// authentication
const Login = React.lazy(() => import("@pages/auth/login"));
const Register = React.lazy(() => import("@pages/auth/register"));

// admin
const RestaurantAdmin = React.lazy(() => import("@src/pages/admin/restaurant"));
const Guest = React.lazy(() => import("@src/pages/admin/guest"));
const Admin = React.lazy(() => import("@src/pages/admin/admin"));

// resmanager
const Food = React.lazy(() => import("@src/pages/resManager/food"));
const Promotion = React.lazy(() => import("@src/pages/resManager/promotion"));

const Page =
  (Component, roles = []) =>
  (props) => {
    return (
      <Suspense fallback={<div></div>}>
        <Authorization accessRoles={roles} isCheckRoute>
          <Component {...props} />
        </Authorization>
      </Suspense>
    );
  };

export const route_auth = [
  {
    component: Page(Login, []),
    accessRoles: [],
    path: ["/auth/login"],
    exact: true,
  },
  {
    component: Page(Register, []),
    accessRoles: [],
    path: ["/auth/register"],
    exact: true,
  },
];

export const route_user = [
  {
    component: Page(Home, []),
    accessRoles: [],
    path: ["/fsocial/home"],
    exact: true,
  },
  {
    component: Page(Restaurant, []),
    accessRoles: [],
    path: ["/fsocial/restaurant"],
    exact: true,
  },
  {
    component: Page(DetailRestaurant, []),
    accessRoles: [],
    path: ["/fsocial/restaurant/detail/:id"],
    exact: true,
  },
  {
    component: Page(Chat, []),
    accessRoles: [],
    path: ["/fsocial/chat"],
    exact: true,
  },
];

export const route_res_manager = [
  {
    component: Page(Home, []),
    accessRoles: [],
    path: ["/res-manager/home"],
    exact: true,
  },
  {
    component: Page(Food, []),
    accessRoles: [],
    path: ["/res-manager/food"],
    exact: true,
  },
  {
    component: Page(Promotion, []),
    accessRoles: [],
    path: ["/res-manager/promotion"],
    exact: true,
  },
  {
    component: Page(Guest, []),
    accessRoles: [],
    path: ["/res-manager/guest"],
    exact: true,
  },
];

export const route_admin = [
  {
    component: Page(Home, []),
    accessRoles: [],
    path: ["/admin/home"],
    exact: true,
  },
  {
    component: Page(Admin, []),
    accessRoles: [],
    path: ["/admin/admin"],
    exact: true,
  },
  {
    component: Page(RestaurantAdmin, []),
    accessRoles: [],
    path: ["/admin/restaurant"],
    exact: true,
  },
  {
    component: Page(Guest, []),
    accessRoles: [],
    path: ["/admin/guest"],
    exact: true,
  },
];

export const theme = {};
