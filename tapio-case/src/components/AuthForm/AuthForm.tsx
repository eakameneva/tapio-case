import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { clearError } from "../../store/slices/authSlice";

interface IAuthFormValues {
  username: string;
  password: string;
}

interface IAuthFormProps {
  formTitle: string;
  onSubmit: (data: IAuthFormValues) => void;
}

function AuthForm({ formTitle, onSubmit }: IAuthFormProps) {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    getValues,
  } = useForm<IAuthFormValues>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const trimFormData = (data: IAuthFormValues) => {
    const trimmedData = {
      ...data,
      username: data.username.trim(),
      password: data.password.trim(),
    };
    return trimmedData;
  };

  const validateForm = () => {
    const values = getValues();
    let hasError = false;
    const fieldsToValidate: Array<keyof IAuthFormValues> = [
      "username",
      "password",
    ];

    fieldsToValidate.forEach((field) => {
      const trimmedFieldValue = values[field].trim();
      if (!trimmedFieldValue) {
        setError(field, {
          type: "manual",
          message: "This field cannot be empty or contain only spaces",
        });
        hasError = true;
      } else {
        clearErrors(field);
      }
    });
    return !hasError;
  };

  const onSubmitForm = (data: IAuthFormValues) => {
    const trimmedData = trimFormData(data);
    if (validateForm()) {
      onSubmit(trimmedData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <h2 className="text-2xl font-semibold text-lightTurquoise mb-4 text-center">
        {formTitle}
      </h2>
      <TextField
        className={`input-field ${errors.username ? "error-input" : ""}`}
        {...register("username", {
          required: "Required field",
          minLength: {
            value: 3,
            message: "Your username needs to be at least 3 characters.",
          },
          maxLength: {
            value: 20,
            message: "Your username should not be more than 20 characters.",
          },
        })}
        required
        id="outlined-required"
        label="Username"
        fullWidth={true}
      />
      <div className="text-red-600">
        {errors?.username && (
          <span>{errors?.username?.message || "Error"}</span>
        )}
      </div>
      <br />

      <TextField
        className={`input-field ${errors.password ? "error-input" : ""}`}
        {...register("password", {
          required: "Required field",
          minLength: {
            value: 6,
            message: "Your password needs to be at least 6 characters.",
          },
          maxLength: {
            value: 40,
            message: "Your password should not be more than 40 characters.",
          },
        })}
        type="password"
        label="Password"
        required
        id="outlined-required"
        fullWidth={true}
      />
      <div className="text-red-600">
        {errors?.password && (
          <span>{errors?.password?.message || "Error"}</span>
        )}
      </div>
      <br />
      {authError && (
        <p className="text-red-500 text-center mt-2">{authError}</p>
      )}
      <Button
        onClick={handleSubmit(onSubmitForm)}
        variant="outlined"
        sx={{
          color: "#2eb7af",
          borderColor: "#2eb7af",
          "&:hover": {
            backgroundColor: "#2eb7af",
            color: "white",
          },
        }}
      >
        {formTitle}
      </Button>
    </form>
  );
}

export default AuthForm;
