import { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../actions";
import { Buttons } from "../../components";
import { validations } from "./validations";
import "./styles.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkPassword, setCheckPassword] = useState(false);

  const methods = useForm({ shouldUnregister: false, resolver: yupResolver(validations.login), mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors[key].message));
  }, [errors]);

  const handleContinueButton = (e) => dispatch(loginUser({ ...e, onSuccess: () => navigate("/") }));

  return (
    <div className="login-container">
      <div className="flex flex-col items-center h-5/6 w-1/3 bg-white rounded-md">
        <div className="logo my-10" />
        <div className="flex items-center font-bold text-2xl uppercase">Вход в системата</div>
        <p className="font-normal text-sm text-center my-6">Моля въведете вашият имейл и парола</p>
        <div className="flex flex-col justify-between items-center h-1/2 w-full">
          <div className="w-full flex flex-col items-center justify-center">
            <Inputs.Text label={"Имейл"} autoComplete="new-password" outerClassName={`w-5/6 mt-4`} {...register(`email`, { shouldValidate: true })} />
            <Inputs.Text label={"Парола"} autoComplete="new-password" type={!checkPassword && "password"} suffix={<div className="icon see-password w-6 h-6 mr-3" onClick={() => setCheckPassword(!checkPassword)} />} outerClassName={`w-5/6 my-4`} {...register(`password`, { shouldValidate: true })} />
          </div>
          <Buttons.Raised text={"Вход"} selected className={`w-5/6 mt-4`} disabled={!watch("email")?.length || !watch("password")?.length} onClick={handleSubmit(handleContinueButton)} />
          <p className="text-sm text-center">
            Hов сте тук? Регистрирайте се сега – просто кликнете{" "}
            <span className="text-blue-500 underline cursor-pointer text-lg" onClick={() => navigate("/registration")}>
              тук
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
