import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Shared from "../../components/Shared";
import { officesIncomingFields } from "../../config/constants";
import { renderCell } from "../../utilities/renderCell";
import { Buttons } from "../../components";
import { useEffect, useState } from "react";
import { getAllOffices } from "../../actions";

const Offices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { offices } = useSelector((state) => state.offices);
  const { user } = useSelector((state) => state.general);
  const [isCEO, setIsCEO] = useState(false);

  useEffect(() => {
    dispatch(getAllOffices());
  }, [dispatch]);

  useEffect(() => {
    if (user && user?.role === "CEO") setIsCEO(true);
  }, [user]);

  console.log(offices);
  return (
    <div className="main-container">
      <div className="body-container !h-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="inner-title">Всички офиси</h1>
          {isCEO && <Buttons.Raised text={"Създай"} selected className={`w-[200px] !bg-custom_green`} onClick={() => navigate("/office-form")} />}
        </div>
        <Shared.Table fixedWidth columns={isCEO ? officesIncomingFields : officesIncomingFields.slice(0).splice(0,officesIncomingFields.length - 1)} data={offices} renderCell={(row, field) => renderCell.offices(row, field, navigate)} />
      </div>
    </div>
  );
};
export default Offices;
