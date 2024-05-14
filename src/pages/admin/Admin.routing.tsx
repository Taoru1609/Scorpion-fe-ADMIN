import { RouteObject, Outlet } from "react-router-dom";
import RoomType from "./roomtype/RoomType";
import ThongKe from "./thongke/ThongKe";
import DichVu from "./qldichvu/dichvu/DichVu";
import LoaiDichVu from "./qldichvu/loaidichvu/LoaiDichVu";
import RoomList from "./roomlist/RoomList";
import DoanhThu from "./doanhthu/DoanhThu";
import TaiKhoanAdmin from "./taikhoanadmin/TaiKhoanAdmin";

const AdminRouters: RouteObject = {
  path: "/admin",
  element: <Outlet />,
  children: [
    {
      path: "roomtype",
      index: true,
      element: <RoomType/>,
    },

    {
      path: "roomlist",
      index: true,
      element: <RoomList/>,
    },

    {
      path: "thongke",
      index: true,
      element: <ThongKe/>,
    },
    {
      path: "doanhthu",
      index: true,
      element: <DoanhThu/>,
    },
    {
      path: "qldichvu/dichvu",
      index: true,
      element: <DichVu/>,
    },
    
    {
      path: "taikhoanadmin",
      index: true,
      element: <TaiKhoanAdmin/>,
    },
    {
      path: "qldichvu/loaidichvu",
      index: true,
      element: <LoaiDichVu/>,
    },

  ],
};

export default AdminRouters;
