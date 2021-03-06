import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import $ from 'jquery';
import './style.scss';

const FormItem = Form.Item;
let userName = '';
let pwd = '';
class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      userEntrance: false,
      register: false,
    }
  }

  _login(values, id) {
    this.setState({
      login: false,
      register: false,
      userEntrance: true,
    });
    if (values.remember) {
      localStorage.userName = userName;
      localStorage.pwd = pwd;
      localStorage.id = id;
    } else {
      sessionStorage.userName = userName;
      sessionStorage.pwd = pwd;
      sessionStorage.id = id;
    }
    window.location.reload();
  }

  _register(values) {
    const self = this;
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:8000/users',
      data: {
        name: values.userName,
        pwd: values.password
      },
      success: function (data) {
        console.log(data);
        self._login(values, data.id);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { register } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        userName = values.userName;
        pwd = values.password;
        const self = this;
        $.ajax({
          method: 'GET',
          url: 'http://127.0.0.1:8000/users',
          success: function (data) {
            if (register) {
              const isSameName = data.some(user => (user.name === userName));
              !isSameName ? self._register(values) : alert('用户名已存在,再取一个吧！');
            } else {
              let isMatch = false;
              let uId = '';
              data.forEach(user => {
                if ((user.name === userName) && (user.pwd === pwd)) {
                  isMatch = true;
                  uId = user.id;
                }
              });
              isMatch ? self._login(values, uId) : alert('用户名或者密码不正确');
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
        console.log('Received values of form: ', values);
      }
    });
  }

  handleQuit() {
    sessionStorage.clear();
    localStorage.clear();
    this.setState({
      login: true,
      userEntrance: false,
    });
    window.location.reload();
  }

  componentWillMount() {
    if (sessionStorage.userName) {
      this.setState({ login: false, userEntrance: true });
      userName = sessionStorage.userName;
      pwd = sessionStorage.pwd;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { register, login, userEntrance } = this.state;
    return (
      <div>
        {
          (register || login) && <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="http://localhost:3000/blog/tuya">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {register ? 'register' : 'Log in'}
              </Button>
              Or <Button onClick={() => { this.setState({ login: false, register: true }) }}>register now!</Button>
            </FormItem>
          </Form>
        }
        {
          userEntrance && <div className="user-center-entrance">
            <p>进入个人中心</p>
            <a href="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
              <img style={{ width: 30 }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="avatar" />
            </a>
            <p>姓名：{userName}</p>
            <p>密码：{pwd}</p>
            <Button type="primary" onClick={() => { this.handleQuit() }} className="login-form-button">
              退出
            </Button>
          </div>
        }
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;
