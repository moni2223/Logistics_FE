import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks";
import { Buttons, Inputs } from "../../components";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOffice, deleteOffice, editOffice, getOfficeById } from "../../actions";

const OfficeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useParams();

  const methods = useForm({ shouldUnregister: false, mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.log(_id)
    if (_id) {
      dispatch(
        getOfficeById(_id, (res) => {
          setValue("location", res.location);
          setValue("phone", res.phone);
        })
      );
    }
  }, [_id, setValue, dispatch]);

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors[key].message));
  }, [errors]);

  const handleSave = (data) => {
    if (_id) {
      dispatch(
        editOffice(_id, data, () => {
          toast.success("Редактирате офиса успешно");
          navigate(-1);
        })
      );
    } else {
      dispatch(
        createOffice(data, () => {
          toast.success("Офисът беше създаден успешно");
          navigate(-1);
        })
      );
    }
  };

  const handleDelete = () => {
    dispatch(
      deleteOffice(_id, () => {
        toast.success("Изтрихте офиса успешно");
        navigate(-1);
      })
    );
  };

  return (
    <div className="main-container">
      <div className="inner-header-container">
        <div className="icon close w-5 h-5 mx-2" onClick={() => navigate(-1)} />
        <h1 className="font-medium text-2xl">{_id ? "Редакция на офис" : "Създаване на офис"}</h1>
        {/* {_id && <Buttons.Raised text="Изтрий" className="!bg-custom_red !ml-auto !w-[150px]" onClick={handleDelete} />} */}
        <Buttons.Raised text="Запази" className={`!bg-custom_green !mr-5 !w-[150px] !ml-auto`} onClick={handleSubmit(handleSave)} />
      </div>
      <div className="body-container !h-[unset]">
        <div className="w-full flex items-center gap-4 flex-wrap">
          <Inputs.Text label="Локация" compulsory outerClassName="!w-[400px]" {...register("location")} />
          <Inputs.Text label="Телефонен номер" compulsory outerClassName="!w-[400px]" {...register("phone")} />
        </div>
      </div>
    </div>
  );
};

export default OfficeForm;
