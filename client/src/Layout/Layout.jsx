import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined, AppstoreOutlined, SnippetsOutlined, WarningOutlined, CheckSquareOutlined, BarChartOutlined, UserOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import logo from '../assets/logo.png';
import { ConfigProvider, theme, Card } from "antd";
import { BulbOutlined, StarOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';
//import { logout } from '../Pages/Login/Login';
// import { setAuthToken } from '../Pages/Login/Login';

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: 'sub1',
    icon: React.createElement(AppstoreOutlined),
    label: 'New Requests',
    to: 'admin/new'
  },
  {
    key: 'sub2',
    icon: React.createElement(CheckSquareOutlined),
    label: 'Accepted',
    children: [
      {
        key: 11,
        label: 'Send Emails',
        to: 'admin/send'
      },
      {
        key: 12,
        label: 'Waiting For Spin',
        to: 'admin/waiting'
      },
    ]
  },
  {
    key: 'sub3',
    icon: React.createElement(BarChartOutlined),
    label: 'Completed',
    to: 'admin/completed'
  },
  {
    key: 'sub4',
    icon: React.createElement(WarningOutlined),
    label: 'Rejected',
    to:'admin/rejected',
  }

];

const renderMenuItems = (menuItems) => {
  return menuItems.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={`/${item.to}`}>{item.label}</Link>
        </Menu.Item>
      );
    }
  });
};


const AdminLayout = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setAuthToken(token)
  // }, [])

  const handleTheme = () => {
    setIsDarkMode((previousValue) => !previousValue);

  };


  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
      <Layout>
        {/* Sidebar */}
        <Sider trigger={null} collapsible collapsed={collapsed}>

          <div className="demo-logo-vertical" style={{ height: '65px' , background: isDarkMode? 'black ' :'white' }}> <img src={logo} alt="logo" style={{ width: '100%', height: '100%', objectFit:'contain' }} /> </div>

          <Menu
            mode="inline"
            defaultSelectedKeys={['sub1']}
            defaultOpenKeys={['sub1']}
            style={{
              borderRight: 0,
            }}
            theme='dark'
          >
            {renderMenuItems(items)}
          </Menu>
        </Sider>
        <Layout>
          {/* Top Header */}
          <Header
            style={{
              position:'relative',
              padding: '0',
              background: isDarkMode? 'black ' :'white'
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: 64,
                height: '100%',
              }}
            />
            {/* <Button onClick={logout}>LogOut</Button> */}
            {/*THEME SWITCH BUTTON*/}
            <Space direction="vertical" style={{position:'absolute', right:'3%'}}>
              <Switch onClick={handleTheme}
                checkedChildren={<BulbOutlined />}
                unCheckedChildren={<StarOutlined />}
                
              />
            </Space>
            {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
          </Header>

          <Content
            style={{
              padding: '0px 24px',
              margin: '0px 16px',
              minHeight: '81.4vh',
            }}
          >

            {/* Pages Section */}
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Fudges Emojis
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;