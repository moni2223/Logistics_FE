import { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./styles.scss";
import { registerUser } from "../../actions";
import { Buttons } from "../../components";
import { validations } from "./validations";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkPassword, setCheckPassword] = useState(false);

  const methods = useForm({ shouldUnregister: false, resolver: yupResolver(validations), mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors[key].message));
  }, [errors]);

  const isButtonDisabled = () => {
    return !watch("email")?.length || !watch("password")?.length || !watch("first_name")?.length || !watch("last_name")?.length;
  };

  const handleContinueButton = (e) => {
    dispatch(
      registerUser({
        ...e,
        onSuccess: () => {
          toast.success("Регистрацията беше успешна");
          navigate("/login");
        },
      })
    );
  };

  return (
    <div className="login-container">
      <div className="flex flex-col items-center h-5/6 w-[45%] bg-white rounded-md">
        <div className="logo my-10" />
        <div className="flex items-center font-bold text-2xl uppercase">Регистрция в системата</div>
        <p className="font-normal text-sm text-center my-6">Моля въведете вашите данни, за да може да използвате нашата платформа</p>
        <div className="flex flex-col justify-between items-center h-1/2 w-full">
          <div className="w-full flex items-center gap-4 flex-wrap justify-center">
            <Inputs.Text label={"Име"} autoComplete="new-password" compulsory outerClassName={`${window.innerWidth < 1550 ? "w-[250px]" : "w-[350px]"}`} {...register(`first_name`, { shouldValidate: true })} />
            <Inputs.Text label={"Фамилия"} autoComplete="new-password" compulsory outerClassName={`${window.innerWidth < 1550 ? "w-[250px]" : "w-[350px]"}`} {...register(`last_name`, { shouldValidate: true })} />
            <Inputs.Text label={"Имейл"} autoComplete="new-password" compulsory outerClassName={`${window.innerWidth < 1550 ? "w-[250px]" : "w-[350px]"}`} {...register(`email`, { shouldValidate: true })} />
            <Inputs.Text label={"Парола"} autoComplete="new-password" compulsory type={!checkPassword && "password"} suffix={<div className="icon see-password w-6 h-6 mr-3" onClick={() => setCheckPassword(!checkPassword)} />} outerClassName={`${window.innerWidth < 1550 ? "w-[250px]" : "w-[350px]"}`} {...register(`password`, { shouldValidate: true })} />
            <Inputs.Text label={"Телефонен номер"} autoComplete="new-password" compulsory outerClassName={`${window.innerWidth < 1550 ? "w-[250px]" : "w-[350px]"}`} {...register(`phone_number`, { shouldValidate: true })} />
            <Inputs.Text label={"Адрес"} autoComplete="new-password" outerClassName={`${window.innerWidth < 1550 ? "w-[250px]" : "w-[350px]"}`} {...register(`address`)} />
          </div>
          <Buttons.Raised text={"Регистрация"} selected className={`w-5/6 mt-4`} disabled={isButtonDisabled()} onClick={handleSubmit(handleContinueButton)} />
          <p className="text-sm text-center">
            Вече сте регистриран? Влезте тук сега – просто кликнете{" "}
            <span className="text-blue-500 underline cursor-pointer text-lg" onClick={() => navigate("/login")}>
              тук
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
