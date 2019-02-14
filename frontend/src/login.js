import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import './login.css'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        // 设置 initial state
        this.state = {
            username: "",
            userpass:"",
            namevalidateStatus:"",
            passvalidateStatus:"",
            lastvalidateStatus:"",
            nameHelp:"",
            passHelp:"",
            lastHelp:""
        };
        // ES6 类中函数必须手动绑定
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleUserpassChange = this.handleUserpassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handleUserpassChange(event) {
        this.setState({
            userpass: event.target.value
        });
    }

    handleSubmit(event) {
        if(this.state.username == ''){
            this.setState({
                namevalidateStatus: 'error',
                nameHelp:'请输入用户名！'
            });
        }
        else if(this.state.userpass == ''){
            this.setState({
                passvalidateStatus: 'error',
                passHelp:'请输入密码！'
            });
        }
        else {
            let initHeaders = new Headers();
            initHeaders.append('Accept', 'application/json, text/plain, */*');
            initHeaders.append('Cache-Control', 'no-cache');
            initHeaders.append('Content-Type', 'application/json');

            let formData = {};
            formData['userName'] = this.state.username;
            formData['userPass'] = this.state.userpass;
            console.log(formData);
            let body = JSON.stringify(formData);
            console.log(body)

            const init = {
                method: 'POST',
                credentials: 'include', // cookies
                headers: initHeaders,
                body
            }

            fetch(
                'http://localhost:8080/login',
                init
            )
                .then(res => res.json())
                .then(data => {
                })
                .catch(e => console.log('错误:', e))
        }
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}  className="login-form">
                <h1>欢迎登录</h1>
                <Form.Item validateStatus={this.state.namevalidateStatus} help={this.state.nameHelp}>
                    <Input className="username"  value={this.state.username} onChange={this.handleUsernameChange} prefix={<Icon type="user" style={{ fontSize: 13 }} />}  placeholder="Username" />
                </Form.Item>
                <Form.Item validateStatus={this.state.passvalidateStatus} help={this.state.passHelp}>
                    <Input className="userpass"  value={this.state.userpass} onChange={this.handleUserpassChange}  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item validateStatus={this.state.lastvalidateStatus} help={this.state.lastHelp}>
                    <Checkbox className="remember-me">记住我</Checkbox>
                    <a className="login-form-forgot">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    <a>注册</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;