import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        userName = values.userName;
        pwd = values.password;
        this.setState({
          login: false,
          userEntrance: true,
        });
        if (values.remember) {
          localStorage.userName = userName;
          localStorage.pwd = pwd;
        } else {
          sessionStorage.userName = userName;
          sessionStorage.pwd = pwd;
        }
        window.location.reload();
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
    const { login, userEntrance } = this.state;
    return (
      <div>
        {
          login && <Form onSubmit={this.handleSubmit} className="login-form">
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
                Log in
              </Button>
              Or <a href="http://localhost:3000/blog/tuya">register now!</a>
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
