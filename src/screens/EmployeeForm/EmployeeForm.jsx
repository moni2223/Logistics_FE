import { useNavigate, useParams } from "react-router-dom";
import { Buttons, Inputs } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createEmployee, deleteEmployee, editEmployee, getAllOffices, getEmployeeById } from "../../actions";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useParams();

  const [offices, setOffices] = useState([]);

  const methods = useForm({ shouldUnregister: false, mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    dispatch(getAllOffices({ onSuccess: (res) => setOffices(res) }));
    if (_id) {
      dispatch(
        getEmployeeById(_id, (res) => {
          console.log(res)
          setValue("first_name", res.first_name);
          setValue("last_name", res.last_name);
          setValue("email", res.email);
          setValue("position", { label: ["OFFICE_CLERK", "OFFICE"].includes(res.position.position_name) ? "Офис работник" : "Куриер", value: res.position_id });
          setValue("office_id", { label: res.office.location, value: res.office.office_id });
        })
      );
    }
  }, [_id, setValue, dispatch]);

  const handleSave = (data) => {
    const payload = { ...data, position: ["OFFICE_CLERK", "OFFICE"].includes(data.position.value) ? "OFFICE" : data.position.value, role: data.position.value, office_id: data.office_id.value };
    if (_id) {
      dispatch(
        editEmployee(_id, payload, () => {
          toast.success("Редактирате служителя успешно");
          navigate(-1);
        })
      );
    } else
      dispatch(
        createEmployee(payload, () => {
          toast.success("Създадохте служителя успешно");
          navigate(-1);
        })
      );
  };

  const handleDelete = () => {
    dispatch(
      deleteEmployee(_id, () => {
        toast.success("Служителят е изтрит успешно");
        navigate(-1);
      })
    );
  };

  return (
    <div className="main-container">
      <div className="inner-header-container">
        <div className="icon close w-5 h-5 mx-2" onClick={() => navigate(-1)} />
        <h1 className="font-medium text-2xl">{_id ? "Редакция на служител" : "Създаване на служител"}</h1>
        {_id && <Buttons.Raised text="Изтрий" className="!bg-custom_red !ml-auto !w-[150px]" onClick={handleDelete} />}
        <Buttons.Raised text="Запази" className={`!bg-custom_green !mr-5 !w-[150px] ${!_id && "!ml-auto"}`} onClick={handleSubmit(handleSave)} />
      </div>
      <div className="body-container !h-[unset]">
        <div className="w-full flex items-center gap-4 flex-wrap">
          <Inputs.Text label="Име" compulsory disabled={_id} inputClassName={`${errors?.first_name && "border !border-red-500"}`} outerClassName="!w-[400px]" {...register("first_name", { required: true })} />
          <Inputs.Text label="Фамилия" compulsory disabled={_id} inputClassName={`${errors?.last_name && "border !border-red-500"}`} outerClassName="!w-[400px]" {...register("last_name", { required: true })} />
          <Inputs.Text label="Имейл" compulsory inputClassName={`${errors?.email && "border !border-red-500"}`} outerClassName="!w-[400px]" {...register("email", { required: true })} />
          {!_id && <Inputs.Text label="Парола" compulsory inputClassName={`${errors?.password && "border !border-red-500"}`} outerClassName="!w-[400px]" {...register("password", { required: true })} />}
          <Controller
            control={control}
            name="office_id"
            rules={{ required: true }}
            render={({ field: { value }, fieldState: { error } }) => <Inputs.Dropdown label="Офис" compulsory outerClassName="!w-[400px]" className={`${error && "border-2 border-red-500 rounded-md"}`} value={value} optionsArray={offices.map(({ office_id, location }) => ({ label: location, value: office_id }))} onChange={(e) => setValue("office_id", e)} />}
          />
          <Controller
            control={control}
            name="position"
            render={({ field: { value }, fieldState: { error } }) => (
              <Inputs.Dropdown
                label="Позиция"
                compulsory
                outerClassName={`!w-[400px]`}
                className={`${error && "border-2 border-red-500 rounded-md"}`}
                optionsArray={[
                  { label: "Куриер", value: "COURIER" },
                  { label: "Офис работник", value: "OFFICE_CLERK" },
                  // { label: "CEO", value: "CEO" },
                ]}
                value={value}
                onChange={(e) => setValue("position", e)}
              />
            )}
            rules={{ required: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
