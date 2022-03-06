export const routes = [
  {
    title: "Nhà hàng",
    path: "/fsocial/restaurant",
  },
  {
    title: "Tin nhắn",
    path: "/fsocial/chat",
  },
];

export const routes_res_manager = [
  {
    title: "Quản lý Nhà hàng",
    children: [
      {
        title: "Quản lý món ăn",
        path: "/res-manager/food",
      },
      // {
      //   title: "Quản lý bài đăng",
      //   path: "/res-manager/post",
      // },
      {
        title: "Quản lý khuyến mãi",
        path: "/res-manager/promotion",
      },
      {
        title: "Xem đánh giá",
        path: "/res-manager/review",
      },
      {
        title: "Quản lý đặt bàn",
        path: "/res-manager/order",
      },
    ],
  },
];

export const routes_admin = [
  {
    title: "Quản Trị Viên",
    path: "/admin/admin",
  },
  {
    title: "Nhà hàng",
    path: "/admin/restaurant",
  },
  {
    title: "Khách",
    path: "/admin/guest",
  },
];
