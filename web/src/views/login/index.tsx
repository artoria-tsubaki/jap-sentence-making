import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { registerApi } from "../../api/modules/login";
import { loginApi } from "../../api/modules/login";
import { setToken, setUserId } from "@/redux/modules/global/action";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const login = (props: any) => {
  const { setToken, setUserId } = props;
  const navigate = useNavigate();

  const [pageType, setPageType] = useState<"login"|"signup">("login");
  const [usernameValue, setUsernameValue] = useState('');
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('');
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 防止表单默认提交
      if(pageType === "login"){
        onLogIn();
      }else{
        onSignUp();
      }
    }
  }

  const onLogIn = async () => {
    // TODO: Implement login
    const { data } = await loginApi({ username: usernameValue, password: btoa(passwordValue) })
    console.log(data);
    setToken(data?.accessToken);
    setUserId(data?.user_id);
    message.success("登录成功");
    setTimeout(() => {
      navigate("/form");
    }, 1000);
  }
  const onSignUp = async () => {
    // TODO: Implement signup
    const { code } = await registerApi({ username: usernameValue, password: btoa(passwordValue) });
    if (code === 200) {
      message.success("注册成功");
      setPageType("login");
    } else {
      message.error("注册失败");
    }
  }

  return (
    <div className="w-full h-full relative">
      <Card className="w-[350px] absolute top-1/2 -translate-y-1/2 right-48">
        <CardHeader>
          <CardTitle>{ pageType === "login" ? "Log In" : "Sign Up" }</CardTitle>
          <CardDescription>{ pageType === "login" ? "Log in to an existing account." : "Create a free account in under a minute."}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Name</Label>
                <Input id="username" value={usernameValue} onChange={handleUsernameChange} placeholder="please input your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={passwordValue} 
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyDown} // 监听键盘事件 
                  placeholder="please input your password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {
            pageType === "login" ?
            (
              <>
                <Button variant="outline" onClick={() => { setPageType("signup") }}>Sign Up</Button>
                <Button onClick={ onLogIn }>Log In</Button>
              </>
            ) :
            (
              <>
                <Button variant="outline" onClick={() => { setPageType("login") }}>Log In</Button>
                <Button onClick={ onSignUp }>Sign Up</Button>
              </>
            )
          }
        </CardFooter>
      </Card>
    </div>
  )
}

const mapDispatchToProps = { setToken, setUserId };
export default connect(null, mapDispatchToProps)(login);