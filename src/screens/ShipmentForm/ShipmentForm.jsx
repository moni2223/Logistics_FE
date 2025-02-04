import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks";
import { Buttons, Inputs } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validations } from "./validations";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createShipment, deleteShipment, editShipment, getAllCustomers, getAllEmployees, getAllOffices, getShipmentById, registerUser } from "../../actions";
import { calculateShipmentPrice } from "../../utilities/helpers";

const ShipmentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { onlyStatus } = useQuery();
  const [offices, setOffices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [status, setStatus] = useState(null);
  const { shipment } = useSelector(({ shipments }) => shipments);

  const methods = useForm({ shouldUnregister: false, resolver: yupResolver(validations), mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    dispatch(getAllOffices({ onSuccess: (res) => setOffices(res) }));
    dispatch(getAllCustomers({ onSuccess: (res) => setCustomers(res?.filter(cust => cust?.first_name !== "deleted")) }));
    dispatch(getAllEmployees({ onSuccess: (res) => setCouriers(res?.filter((el) => el?.position?.position_name === "COURIER" && el?.first_name !== "deleted")) }));
    if (_id) {
      dispatch(
        getShipmentById(_id, (res) => {
          setValue("sender", { label: `${res?.sender?.first_name} ${res?.sender?.last_name}`, value: res?.sender?.client_id });
          setValue("recipient", { label: `${res?.recipient?.first_name} ${res?.recipient?.last_name}`, value: res?.recipient?.client_id });
          setValue("delivery_type", { label: res?.delivery_type === "Address" ? "Адрес" : "Офис", value: res?.delivery_type === "Address" ? "ADDRESS" : "OFFICE" });
          setValue("delivery_address", res?.delivery_type === "Address" ? res?.delivery_address : { label: res?.delivery_address, value: res?.delivery_address });
          setValue("assigned_courier_id", { label: `${res?.assigned_courier?.first_name} ${res?.assigned_courier?.last_name}`, value: res?.assigned_courier?.employee_id });
          setValue("weight", res?.weight);
          setValue("price", res?.price);
          console.log(res);
          if (onlyStatus) setStatus({ label: res?.status === "Registered" ? "Регистрирана" : res?.status === "In Transit" ? "В процес на доставяне" : "Доставена", value: res?.status?.toUpperCase() });
        })
      );
    }
  }, [_id, setValue, onlyStatus, dispatch]);

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors[key].message));
  }, [errors]);

  const handleSave = (data) => {
    let payload = {
      ...data,
      sender_id: data.sender.value,
      delivery_type: data.delivery_type.value,
      delivery_address: data.delivery_type.value === "OFFICE" ? data.delivery_address.value : data.delivery_address,
      recipient_id: data.recipient.value,
      status: _id ? shipment?.status?.toUpperCase() : "REGISTERED",
      assigned_courier_id: data.assigned_courier_id.value,
      price: _id && shipment.delivery_address !== data?.delivery_address ? calculateShipmentPrice(data.weight, data.delivery_type.value, true) + 5 : calculateShipmentPrice(data.weight, data.delivery_type.value),
    };
    if (_id) {
      delete payload.sender;
      delete payload.recipient;
      dispatch(
        editShipment(_id, payload, () => {
          toast.success("Редактирахте пратката успешно");
          navigate(-1);
        })
      );
      return null;
    }
    if (data?.recipient?.__isNew__) {
      //Register new user with first_name, last_name, recipient_phoneNumber, recipient_email
      dispatch(
        registerUser({
          first_name: data.recipient.label?.split(" ")?.[0],
          last_name: data.recipient.label?.split(" ")?.[1],
          phone_number: data.recipient_phoneNumber,
          email: data.recipient_email,
          password: "12345", // default password
          onSuccess: (res) => {
            payload.recipient_id = res.client_id;
            delete payload.recipient;
            delete payload.sender;
            delete payload.recipient_phoneNumber;
            delete payload.recipient_email;
            dispatch(
              createShipment(payload, () => {
                toast.success("Пратката е създадена успешно");
                navigate(-1);
              })
            );
          },
        })
      );
    } else {
      delete payload.recipient;
      delete payload.sender;
      dispatch(
        createShipment(payload, () => {
          toast.success("Пратката е създадена успешно");
          navigate(-1);
        })
      );
    }
  };

  const handleChangeStatus = () => {
    dispatch(
      editShipment(_id, { status: status.value }, () => {
        toast.success("Променихте статуса на пратката успешно");
        navigate(-1);
      })
    );
  };
  const handleCancel = () => {
    dispatch(
      deleteShipment(_id, () => {
        toast.success("Изтрихте пратката успешно");
        navigate(-1);
      })
    );
  };

  return (
    <div className="main-container">
      <div className="inner-header-container">
        <div className="icon close w-5 h-5 mx-2" onClick={() => navigate(-1)} />
        <h1 className="font-medium text-2xl">{_id ? "Редакция на пратка" : "Създаване на пратка"}</h1>
        {_id && !onlyStatus && <Buttons.Raised text="Изтрий" className="!bg-custom_red !ml-auto !w-[150px]" onClick={handleCancel} />}
        <Buttons.Raised
          text="Запази"
          className={`!bg-custom_green !mr-5 !w-[150px] ${!_id || onlyStatus ? "!ml-auto" : ""}`}
          onClick={() => {
            if (!onlyStatus) handleSubmit(handleSave)();
            else handleChangeStatus();
          }}
        />
      </div>
      <div className="body-container !h-[unset]">
        {onlyStatus ? (
          <Inputs.Dropdown
            label="Статус"
            compulsory
            outerClassName="!w-[400px]"
            optionsArray={[
              { label: "Регистрирана", value: "REGISTERED" },
              { label: "В процес на доставяне", value: "IN_TRANSIT" },
              { label: "Доставена", value: "DELIVERED" },
            ]}
            value={status}
            onChange={(e) => setStatus(e)}
          />
        ) : (
          <div className="w-full flex items-center gap-4 flex-wrap">
            <Controller
              control={control}
              name="sender"
              render={({ field: { value } }) => <Inputs.Dropdown label="Подател" compulsory disabled={_id} outerClassName="!w-[400px]" optionsArray={customers.map((el) => ({ label: `${el?.first_name} ${el?.last_name}`, value: el?.client_id }))} value={value} onChange={(e) => setValue("sender", e)} />}
              rules={{ shouldValidate: true }}
            />
            <Controller
              control={control}
              name="recipient"
              render={({ field: { value } }) => <Inputs.Dropdown label="Получател (име и фамилия)" compulsory disabled={_id} creatable outerClassName="!w-[400px]" optionsArray={customers.map((el) => ({ label: `${el?.first_name} ${el?.last_name}`, value: el?.client_id }))} value={value} onChange={(e) => setValue("recipient", e)} />}
              rules={{ shouldValidate: true }}
            />
            {watch("recipient")?.__isNew__ && (
              <>
                <Inputs.Text label="Телефонен номер" outerClassName="!w-[400px]" compulsory {...register("recipient_phoneNumber")} />
                <Inputs.Text label="Имейл" outerClassName="!w-[400px]" {...register("recipient_email")} />
              </>
            )}
            <Controller
              control={control}
              name="delivery_type"
              render={({ field: { value } }) => (
                <Inputs.Dropdown
                  label="Тип доставка"
                  outerClassName="!w-[400px]"
                  compulsory
                  value={value}
                  optionsArray={[
                    { label: "Офис", value: "OFFICE" },
                    { label: "Адрес", value: "ADDRESS" },
                  ]}
                  onChange={(e) => {
                    setValue("delivery_type", e);
                    setValue("delivery_address", "");
                  }}
                />
              )}
              rules={{ shouldValidate: true }}
            />
            {watch("delivery_type")?.value === "ADDRESS" ? (
              <Inputs.Text label="Адрес за доставка" compulsory outerClassName="!w-[400px]" {...register("delivery_address", { shouldValidate: true })} />
            ) : (
              watch("delivery_type")?.value === "OFFICE" && (
                <Controller
                  control={control}
                  name="delivery_address"
                  render={({ field: { value } }) => <Inputs.Dropdown label="Офис" compulsory outerClassName="!w-[400px]" value={value} optionsArray={offices.map(({ location }) => ({ label: location, value: location }))} onChange={(e) => setValue("delivery_address", e)} />}
                  rules={{ shouldValidate: true }}
                />
              )
            )}
            <Controller
              control={control}
              name="assigned_courier_id"
              render={({ field: { value } }) => <Inputs.Dropdown label="Назначен куриер" creatable compulsory outerClassName="!w-[400px]" optionsArray={couriers.map((el) => ({ label: `${el?.first_name} ${el?.last_name}`, value: el?.employee_id }))} value={value} onChange={(e) => setValue("assigned_courier_id", e)} />}
              rules={{ shouldValidate: true }}
            />
            <Inputs.Text label="Тегло (кг.)" type="number" compulsory disabled={_id} outerClassName="!w-[400px]" {...register("weight", { valueAsNumber: true, shouldValidate: true })} />
            {_id && (
              <Inputs.Text
                label="Цена (лв.)"
                type="number"
                disabled
                outerClassName="!w-[400px]"
                value={watch("price")}
                onChange={(e) => {
                  console.log(e);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentForm;
