import { Layout } from "antd";
import "./Layout.style.scss";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
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

  // call api authorization (menu, userinfo, list action)

  const getApiData = () => {
    setTimeout(() => {
      // call api xong

      // lấy được dữ liệu menu từ api
      const menuData = [
        {
          id: 1,
          icon: 'isax-chart-square',
          label: 'ADMIN',
          url: null,
          parent: null
        },
        {
          id: 2,
          icon: 'isax-document-text1',
          label: 'LOẠI PHÒNG',
          url: '/admin/roomtype',
          parent: 1
        },
       
        {
          id: 5,
          icon: 'isax-document-text1',
          label: 'STAFF',
          url: null,
          parent: null
        },
        {
          id: 6,
          icon: 'isax-clipboard-text1',
          label: 'DANH SÁCH KHÁCH ĐẶT',
          url: '/staff/reservation',
          parent: 5,
        },
        {
          id: 7,
          icon: 'isax-chart-square',
          label: 'SƠ ĐỒ PHÒNG',
          url: '/staff/roomdiagram',
          parent: 5,
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
