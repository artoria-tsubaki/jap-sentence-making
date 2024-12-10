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
import { ExampleApi } from "@/api/modules";

const login = () => {
  const [pageType, setPageType] = useState<"login"|"signup">("login");

  const onLogIn = () => {
    // TODO: Implement login
    ExampleApi({ user_id : 1 }).then((res) => {
      console.log(res);
    })
  }
  const onSignUp = () => {
    // TODO: Implement signup
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
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="please input your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="please input your password" />
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