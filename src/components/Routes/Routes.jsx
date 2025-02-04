import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoaderGlobal from "../LoaderGlobal/LoaderGlobal";
import { User } from "../../utilities/User";
import { Clients, EmployeeForm, Employees, Home, Login, OfficeForm, Offices, Register, ShipmentForm } from "../../screens";
import Header from "../Header";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  if (!User.isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AuthRoute = ({ children }) => {
  let location = useLocation();
  if (User.isAuthenticated) return <Navigate to="/" state={{ from: location }} replace />;
  return children;
};

const authRoutes = [
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/registration",
    element: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
  },
];

const privateRoutes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/shipment-form",
    element: (
      <PrivateRoute>
        <ShipmentForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/shipment-form/:_id",
    element: (
      <PrivateRoute>
        <ShipmentForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/clients",
    element: (
      <PrivateRoute>
        <Clients />
      </PrivateRoute>
    ),
  },
  {
    path: "/employees",
    element: (
      <PrivateRoute>
        <Employees />
      </PrivateRoute>
    ),
  },
  {
    path: "/employee-form",
    element: (
      <PrivateRoute>
        <EmployeeForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/employee-form/:_id",
    element: (
      <PrivateRoute>
        <EmployeeForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/offices",
    element: (
      <PrivateRoute>
        <Offices />
      </PrivateRoute>
    ),
  },
  {
    path: "/office-form",
    element: (
      <PrivateRoute>
        <OfficeForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/office-form/:_id",
    element: (
      <PrivateRoute>
        <OfficeForm />
      </PrivateRoute>
    ),
  },
];

const RoutesComp = () => {
  const { user } = useSelector(({ general }) => general);
  return (
    <>
      {User.isAuthenticated && <Header />}
      <Routes>
        {authRoutes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
        {privateRoutes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
      <LoaderGlobal />
    </>
  );
};

export default RoutesComp;
