import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import IndexRouter from '../router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class IndexLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="mail">
              <Icon type="mail" />Navigation One
        </Menu.Item>
            <Menu.Item key="app" disabled>
              <Icon type="appstore" />Navigation Two
        </Menu.Item>
            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
            </Menu.Item>
          </Menu>
          <div className="main-menu">
            <ul>
              <li>
                <Link to="/blog/index">首页</Link>
              </li>
              <li>
                分类
                <ul>
                  <li>
                    <Link to="/blog/category?id=jishu">技术</Link>
                  </li>
                  <li>
                    <Link to="/blog/category?id=living">人生</Link>
                  </li>
                  <li>
                    <Link to="/blog/category/feel">感动</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/blog/tuya">涂鸦</Link>
              </li>
              <li>
                <Link to="/blog/shudong">树洞</Link>
              </li>
            </ul>
          </div>
          <div className="container">
            <div className="content">
              <Route path="/blog/:menu?" component={IndexRouter} />
            </div>
            <div className="r-aside">
              右侧登录注册组件
          </div>
          </div>
        </div>
      </Router>
    );
  }
}