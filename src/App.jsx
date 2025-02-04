import { useDispatch } from "react-redux";
import { Routes } from "./components";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { User } from "./utilities/User";
import { getCurrentUser } from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (User.isAuthenticated) dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
