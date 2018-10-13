import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import IndexRouter from '../router';
import './style.scss';
import WrappedNormalLoginForm from '../components/login';

const SubMenu = Menu.SubMenu;

export default class IndexLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'index',
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
          <div className="main-menu">
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="index">
                <Link to="/blog/index">
                  <Icon type="home" />首页
                </Link>
              </Menu.Item>
              <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />分类</span>}>
                <Menu.Item key="jishu">
                  <Link to="/blog/category?id=jishu">
                    <Icon type="github" /> 技术
                  </Link>
                </Menu.Item>
                <Menu.Item key="living">
                  <Link to="/blog/category?id=living">
                    <Icon type="twitter" /> 人生
                  </Link>
                </Menu.Item>
                <Menu.Item key="feel">
                  <Link to="/blog/category/feel">
                    <Icon type="gitlab" /> 感动
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="tuya">
                <Link to="/blog/tuya">
                  <Icon type="yuque" />涂鸦
                </Link>
              </Menu.Item>
              <Menu.Item key="shudong">
                <Link to="/blog/shudong">
                  <Icon type="chrome" />树洞
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="container">
            <div className="content">
              <Route path="/blog/:menu?" component={IndexRouter} />
            </div>
            <div className="r-aside">
              <WrappedNormalLoginForm />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}