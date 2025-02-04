import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Shared from "../../components/Shared";
import { shipmentsIncomingFields } from "../../config/constants";
import { renderCell } from "../../utilities/renderCell";
import { Buttons, Inputs } from "../../components";
import { useEffect, useState } from "react";
import { getAllShipments } from "../../actions";
import _ from "lodash";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.general);
  const [search, setSearch] = useState("");
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);

  useEffect(() => {
    dispatch(
      getAllShipments({
        onSuccess: (res) => {
          setShipments(res);
          setFilteredShipments(res);
        },
      })
    );
  }, [dispatch]);

  const handleSearch = () =>
    setFilteredShipments(shipments.filter((shipment) => shipment.sender.first_name.toLowerCase().includes(search.toLowerCase()) || shipment.sender.last_name.toLowerCase().includes(search.toLowerCase()) || shipment.recipient.first_name.toLowerCase().includes(search.toLowerCase()) || shipment.recipient.last_name.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="main-container">
      <div className="body-container !h-full !p-0">
        <div className="flex justify-between items-center w-full">
          <h1 className="inner-title p-3">Всички пратки</h1>
          <Inputs.Text placeholder="Търсене по клиент" outerClassName="!w-[350px] ml-auto mr-3" suffix={<div className="icon search !w-5 !h-6 !px-5 border-l border-black" onClick={handleSearch} />} value={search} onChange={({ target: { value } }) => setSearch(value)} />
          {user?.role !== "Courier" && !user?.client_id && <Buttons.Raised text={"Създай"} selected className={`w-[200px] !bg-custom_green`} onClick={() => navigate("/shipment-form")} />}
        </div>
        <div className="h-[89%] w-full p-3">
          <Shared.Table fixedWidth columns={user?.client_id ? shipmentsIncomingFields.slice(0).splice(0, shipmentsIncomingFields.length - 1) : shipmentsIncomingFields} data={filteredShipments} renderCell={(row, field) => renderCell.shipments(row, field, navigate, user)} />
        </div>
        {user?.position?.position_name === "CEO" && (
          <div className="p-2 w-full bg-whitish">
            <p>
              Oбщ оборот за изминалата година:{" "}
              <span className="font-bold">
                {_.flatMap(shipments, "price")
                  .reduce((acc, cur) => acc + cur, 0)
                  .toFixed(2)}{" "}
                лв.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
