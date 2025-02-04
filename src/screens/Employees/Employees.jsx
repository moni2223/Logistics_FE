import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Shared from "../../components/Shared";
import { employeesIncomingFields } from "../../config/constants";
import { renderCell } from "../../utilities/renderCell";
import { useEffect, useState } from "react";
import { getAllEmployees } from "../../actions";
import { Buttons } from "../../components";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.general);
  const [isCEO, setIsCEO] = useState(false);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (user && user?.role === "CEO") setIsCEO(true);
  }, [user]);

  return (
    <div className="main-container">
      <div className="body-container !h-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="inner-title">Служители</h1>
          {isCEO && <Buttons.Raised text={"Създай"} selected className={`w-[200px] !bg-custom_green`} onClick={() => navigate("/employee-form")} />}
        </div>
        <Shared.Table fixedWidth columns={isCEO ? employeesIncomingFields : employeesIncomingFields.slice(0).splice(0, employeesIncomingFields.length - 1)} data={employees?.filter((emp) => emp?.first_name !== "deleted")} renderCell={(row, field) => renderCell.employees(row, field, navigate)} />
      </div>
    </div>
  );
};
export default Employees;
