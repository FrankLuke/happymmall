import React from 'react';
import Mutil from 'util/mm.jsx';
const _mm=new Mutil();
import './login.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    onInputChange(e){
        let iptValue=e.target.value,
            iptName=e.target.name;
        console.log(iptName , iptValue);            
        this.setState({
            [iptName]:iptValue
        });
    }
    onSubmit(){
        _mm.request({
            url:'www.baidu.com'
        })
    }
    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default login-panel">
                <div className="panel-heading">
                    欢迎登陆
                    <div className="panel-body">
                        <div>
                        <div className="form-group">
                            <label htmlFor="example">用户名</label>
                            <input type="email" 
                            className="form-control" 
                            name="username" 
                            placeholder="请输入用户名"
                            onChange={(e)=>{this.onInputChange(e)}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">密码</label>
                            <input type="password" 
                            className="form-control" 
                            name="password" 
                            placeholder="请输入密码"
                            onChange={(e)=>{this.onInputChange(e)}}
                            />
                        </div>
                        <button type="submit" 
                        className="btn btn-primary btn-block"
                        onClick={(e)=>{this.onSubmit(e)}}
                        >登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Login;