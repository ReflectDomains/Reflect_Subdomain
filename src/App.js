import { useRoutes } from "react-router-dom";
import "./App.less";
import routes from "./config/routes";

const App = () => {
  return useRoutes(routes);
};

export default App;
