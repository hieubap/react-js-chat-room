import Authorization from "@layouts/authorization";
import React, { Suspense } from "react";

// public
const Home = React.lazy(() => import("./public/home"));
const Chat = React.lazy(() => import("./public/chat"));
const Tool = React.lazy(() => import("./public/setting"));

// setting
const LoginSecure = React.lazy(() => import("./public/setting/loginSecure"));

const Page =
  (Component, roles = []) =>
  (props) => {
    return (
      <Suspense fallback={<div>loading</div>}>
        <Authorization accessRoles={roles} isCheckRoute>
          <Component {...props} />
        </Authorization>
      </Suspense>
    );
  };

export const routes_public = [
  {
    path: "/p/home",
    component: Page(Home, []),
  },
  {
    path: "/p/chat",
    component: Page(Chat, []),
  },
  {
    path: "/p/setting",
    component: Page(Tool, []),
  },
];

export const routes_setting = [
  {
    path: "/p/setting/login-secure",
    component: Page(LoginSecure, []),
  },
];
