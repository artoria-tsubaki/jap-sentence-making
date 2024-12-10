import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Login from "@/views/login/index";
import Home from "@/views/home/index";
import List from "@/views/list/index";
import Form from "@/views/form/index";

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
		path: "/login",
		element: <Login />
	},
  {
		path: "/home",
		element: <Home />
	},
  {
		path: "/list",
		element: <List />
	},
  {
		path: "/form",
		element: <Form />
	},
]

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
}

export default Router