import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Shared from "../../components/Shared";
import { clientsIncomingFields } from "../../config/constants";
import { renderCell } from "../../utilities/renderCell";
import { useEffect, useState } from "react";
import { deleteCustomerProfile, getAllCustomers } from "../../actions";

const Clients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers } = useSelector((state) => state.general);
  const { user } = useSelector((state) => state.general);
  const [isCEO, setIsCEO] = useState(false);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (user && user?.role === "CEO") setIsCEO(true);
  }, [user]);

  const handleDeleteClient = (_id) => {
    dispatch(deleteCustomerProfile(_id, () => dispatch(getAllCustomers())));
  };

  return (
    <div className="main-container">
      <div className="body-container !h-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="inner-title">Клиенти</h1>
        </div>
        <Shared.Table fixedWidth columns={isCEO ? clientsIncomingFields : clientsIncomingFields.slice(0).splice(0, clientsIncomingFields.length - 1)} data={customers?.filter(cust => cust?.first_name !== "deleted")} renderCell={(row, field) => renderCell.clients(row, field, handleDeleteClient)} />
      </div>
    </div>
  );
};
export default Clients;
