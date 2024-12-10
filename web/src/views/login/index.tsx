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

const login = () => {
  const [pageType, setPageType] = useState<"login"|"signup">("login");

  const [usernameValue, setUsernameValue] = useState('');
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('');
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const onLogIn = () => {
    // TODO: Implement login
    loginApi({ username: usernameValue, password: passwordValue }).then((res) => {
      console.log(res);
    })
  }
  const onSignUp = () => {
    // TODO: Implement signup
    registerApi({ username: usernameValue, password: passwordValue }).then((res) => {
      console.log(res);
    })
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
                <Input id="password" type="password" value={passwordValue} onChange={handlePasswordChange} placeholder="please input your password" />
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

export default login;