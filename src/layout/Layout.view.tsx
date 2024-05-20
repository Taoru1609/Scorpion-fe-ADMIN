import { Layout } from "antd";
import "./Layout.style.scss";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "./menu/Menu";
import Navbar from "./navbar/Navbar";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";

export const LayoutView = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [hideHtml, setHideHtml] = useState(true);  // hide html if loading UI
  const { loadingService } = useLoading();
  const { dataShareService } = useDataShare();
  const navigate = useNavigate();

  // call api authorization (menu, userinfo, list action)

  const checkLogin = () => {
    let idsUser:any;
		let idsUserStore = localStorage.getItem("idsUser");
		if(idsUserStore){
			idsUser = JSON.parse(idsUserStore);
		}

    if(!idsUser){
      navigate("/public/login");
    }

  }

  const getApiData = () => {
    setTimeout(() => {
      // call api xong

      // lấy được dữ liệu menu từ api
      const menuData = [
        {
          id: 1,
          icon: 'isax-briefcase',
          label: 'DANH MỤC',
          url: null,
          parent: null
        },
        {
          id: 2,
          icon: 'isax-bezier1',
          label: 'Phòng',
          url: null,
          parent: 1
        },

        {
          id: 3,
          icon: 'isax-buildings-2',
          label: 'Thông tin loại phòng',
          url: '/admin/roomtype',
          parent: 2
        },
        {
          id: 4,
          icon: 'isax-building',
          label: 'Danh sách phòng',
          url: '/admin/roomlist',
          parent: 2
        },
        {
          id: 5,
          icon: 'isax-align-left',
          label: 'Thống kê',
          url: '/admin/thongke',
          parent: 1
        },

        {
          id: 6,
          icon: 'isax-chart-1',
          label: 'Doanh thu',
          url: '/admin/doanhthu',
          parent: 1
        },
        {
          id: 7,
          icon: 'isax-archive-book',
          label: 'Danh mục',
          url: null,
          parent: 1
        },

        {
          id: 8,
          icon: 'isax-save-add',
          label: 'Loại dịch vụ',
          url: '/admin/qldichvu/loaidichvu',
          parent: 7
        },
        {
          id: 9,
          icon: 'isax-reserve',
          label: 'Dịch vụ',
          url: '/admin/qldichvu/dichvu',
          parent: 7
        },
        
        {
          id: 10,
          icon: 'isax-key-square1',
          label: 'Tài khoản',
          url: '/admin/taikhoanadmin',
          parent: 1
        },
       
        {
          id: 11,
          icon: 'isax-money-recive1',
          label: 'GIAO DỊCH',
          url: null,
          parent: null
        },
        {
          id: 12,
          icon: 'isax-calendar-2',
          label: 'Danh sách đơn đặt',
          url: '/staff/reservation',
          parent: 11,
        },
        {
          id: 13,
          icon: 'isax-chart-square',
          label: 'Sơ đồ trạng thái phòng hiện tại ',
          url: '/staff/roomdiagram',
          parent: 11,
        },
      ];

      //maping lại chuẩn format dữ liệu của fe đã định nghĩa trước và set vào bộ nhớ share
      dataShareService.setValue('menu-data', menuData.map(x => ({
        id: x.id,
        icon: x.icon,
        label: x.label,
        url: x.url,
        parent: x.parent
      })));

      // dữ liệu user từ api
      const userData = {
        id: 1,
        username: 'Admin',
        fullName: 'Admin'
      };
      // maping lại chuẩn format dữ liệu của fe đã định nghĩa trước và sẻ vào bộ nhớ share
      dataShareService.setValue('user-data', {
        id: userData.id,
        username: userData.username,
        fullName: userData.fullName
      });

      // danh sách mã quyền chức năng mà ứng dụng fe được phân

      const authData: string[] = ['001-view', '001-add', '001-edit', '001-delete', '002-view', '002-add', '002-edit', '002-delete']
      dataShareService.setValue('auth-data', authData);

      setHideHtml(false);
    }, 2000);
  }

  useEffect(() => {
    getApiData();
    checkLogin();
  }, []);

  const layoutHtml = (
    <div className="layout-202404091028">
      <Layout>
        <Navbar open={collapsed} onChange={(event) => setCollapsed(event)} />
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu />
          </Sider>
          <Layout className="content-page">
            <Outlet />
          </Layout>
        </Layout>
      </Layout>
    </div >
  );

  if (hideHtml) {
    loadingService.openLoading();
    return <></>;
  } else {
    loadingService.closeLoading();
    return layoutHtml;
  }
};
