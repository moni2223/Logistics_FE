import { NavLink } from "react-router-dom";
import "./styles.scss";
import { useLocales } from "../../hooks";
import logo from "../../assets/images/project-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions";
import Popup from "reactjs-popup";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.general);

  const NAV_ITEMS = [
    { value: "shipments", label: "Пратки", route: "/" },
    { value: "clients", label: "Клиенти", route: "/clients" },
    { value: "employees", label: "Служители", route: "/employees" },
    { value: "offices", label: "Офиси", route: "/offices" },
  ];

  useLocales("bg");

  return (
    <div className="header-container row flex items-center w-full">
      <div className="header-left row">
        <NavLink to="/">
          <img src={logo} height={70} width={75} alt="logo" />
        </NavLink>
      </div>
      <ul className="header-links !w-full flex justify-center">
        {user?.client_id
          ? NAV_ITEMS.filter((nav) => ["shipments", "offices"].includes(nav.value))?.map(({ value, label, route = "", items }) => (
              <li key={value}>
                <NavLink
                  to={route}
                  onClick={(e) => {
                    if (!items?.length) return;
                    e.preventDefault();
                  }}
                >
                  {label}
                </NavLink>
              </li>
            ))
          : NAV_ITEMS.map(({ value, label, route = "", items }) => (
              <li key={value}>
                <NavLink
                  to={route}
                  onClick={(e) => {
                    if (!items?.length) return;
                    e.preventDefault();
                  }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
      </ul>
      <div className="header-right row">
        <Popup trigger={<div className="avatar-icon cursor-pointer" />} contentStyle={{width:"auto"}} position={"bottom right"}>
          <p className="p-2 whitespace-nowrap">
            Здравейте, <span className="font-bold">{user?.first_name + " " + user?.last_name}</span>
          </p>
        </Popup>
        <div className="icon logout !w-6 !h-6 !mr-4" onClick={() => dispatch(logoutUser())} />
      </div>
    </div>
  );
};

export default Header;
