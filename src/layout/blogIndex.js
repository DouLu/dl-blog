import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IndexRouter from '../router';
export default class IndexLayout extends Component {
  render() {
    return (
      <Router>
        <div>
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