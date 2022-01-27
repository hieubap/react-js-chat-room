import Authorization from "@layouts/authorization";
import React, { Suspense } from "react";

// public
const Home = React.lazy(() => import("./public/home"));

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
];
