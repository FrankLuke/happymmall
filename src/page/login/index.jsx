import React from 'react';
import Mutil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm=new Mutil();
const _user=new User();
import './login.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            redirect:_mm.getUrlParam('redirect')||'/'
        }
    }
    componentWillMount(){
        document.title="登录";
    }
    onInputChange(e){
        let iptValue=e.target.value,
            iptName=e.target.name;
        console.log(iptName , iptValue);            
        this.setState({
            [iptName]:iptValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode===13){
            this.onSubmit();
        }
    }
    onSubmit(){
        let loginInfo={
            username:this.state.username,
            password:this.state.password
        },
        checkResult=_user.checkLoginInfo(loginInfo);
        //验证通过
        if(checkResult){
            _user.login().then(res=>{
                console.log(this.state.redirect);
                _mm.setStorage('userInfo',res);
                this.props.history.push(this.state.redirect);
            },rej=>{
                _mm.errorTips(rej);
            });
        }
        //验证不通过
        else{
            _mm.errorTips(checkResult.msg);
        }
        
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
                            onKeyUp={e=>this.onInputKeyUp(e)}
                            onChange={(e)=>{this.onInputChange(e)}}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">密码</label>
                            <input type="password" 
                            className="form-control" 
                            name="password" 
                            placeholder="请输入密码"
                            onKeyUp={e=>this.onInputKeyUp(e)}
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