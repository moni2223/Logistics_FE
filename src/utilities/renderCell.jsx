import _ from "lodash";
import Popup from "reactjs-popup";
import "../base.scss";

const template = (row, field) => (["boolean"].includes(typeof row?.[field]) ? (row?.[field] ? "Да" : "Не") : ["string", "number"].includes(typeof row?.[field]) ? row?.[field] : "--");

const shipments = (row, field, navigate, user) => {
  switch (field) {
    case "price":
      return row?.price + " лв.";
    case "sender":
      return `${user?.first_name} ${user?.last_name}` === `${row?.sender?.first_name} ${row?.sender?.last_name}` ? <p className="text-red-500">{row?.sender?.first_name + " " + row?.sender?.last_name}</p> : row?.sender?.first_name + " " + row?.sender?.last_name;
    case "recipient":
      return `${user?.first_name} ${user?.last_name}` === `${row?.recipient?.first_name} ${row?.recipient?.last_name}` ? <p className="text-red-500">{row?.recipient?.first_name + " " + row?.recipient?.last_name}</p> : row?.recipient?.first_name + " " + row?.recipient?.last_name;
    case "assigned_courier":
      return row?.assigned_courier?.first_name + " " + row?.assigned_courier?.last_name;
    case "weight":
      return row?.weight + " кг.";
    case "status":
      return row?.[field] === "Registered" ? "Регистрирана" : row?.status === "In Transit" ? "В процес на доставяне" : "Доставена";
    case "settings":
      return (
        <div className="w-full flex items-center pl-4">
          <Popup trigger={<div className="icon manage w-6 h-6" />} position={"left"} contentStyle={{ width: "200px", height: "auto", backgroundImage: "red" }}>
            {() => (
              <div className="h-full p-1 w-full">
                {user?.position?.position_name !== "COURIER" && (
                  <div className="flex items-center w-full justify-between border-b border-black py-3 cursor-pointer" onClick={() => navigate(`/shipment-form/${row.shipment_id}`)}>
                    <p>Редактирай</p> {/* Registered, In Transit, Delivered*/}
                    <div className="icon edit !w-5 !h-5" />
                  </div>
                )}
                <div className="flex items-center w-full justify-between py-3 cursor-pointer" onClick={() => navigate(`/shipment-form/${row.shipment_id}?onlyStatus=true`)}>
                  <p>Промени статус</p>
                  <div className="icon manual !w-5 !h-5" />
                </div>
              </div>
            )}
          </Popup>
        </div>
      );
    default:
      return template(row, field);
  }
};

const clients = (row, field, deleteCustomer) => {
  switch (field) {
    case "names":
      return `${row?.first_name} ${row?.last_name}`;
    case "settings":
      return <div className="icon delete !w-6 !h-6 !ml-2" onClick={() => deleteCustomer(row?.client_id)} />;
    case "shipments":
      return (
        <div className="flex items-center w-full">
          <p className="border-r border-black pr-3">
            Изпратени: <span className="font-bold">{row?.sent_shipments}</span>
          </p>
          <p className="pl-3">
            Получени: <span className="font-bold">{row?.received_shipments}</span>
          </p>
        </div>
      );
    default:
      return template(row, field);
  }
};

const employees = (row, field, navigate) => {
  switch (field) {
    case "name":
      return row?.first_name + " " + row?.last_name;
    case "office":
      return row?.[field]?.location || "--";
    case "position":
      return row?.[field]?.position_name === "COURIER" ? "Куриер" : row?.[field]?.position_name === "OFFICE" ? "Офис работник" : "CEO";
    case "settings":
      return (
        <div className="w-full flex items-center pl-4">
          <div className="icon edit !w-5 !h-5" onClick={() => navigate(`/employee-form/${row?.employee_id}`)} />
        </div>
      );
    default:
      return template(row, field);
  }
};

const offices = (row, field, navigate) => {
  switch (field) {
    case "settings":
      return <div className="icon manage w-6 h-6" onClick={() => navigate(`/office-form/${row?.office_id}`)} />;
    default:
      return template(row, field);
  }
};

export const renderCell = {
  shipments,
  clients,
  offices,
  employees,
};
