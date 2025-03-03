import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { clearError } from "../../store/slices/authSlice";
import { AuthType, IUser } from "../../types";

const getFormTitle = (authType: AuthType) => {
  switch (authType) {
    case "signIn":
      return "Sign In";

    case "signUp":
      return "Sign Up";
  }
};

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;
const MAX_USERNAME_LENGTH = 20;
const MAX_PASSWORD_LENGTH = 40;

interface IAuthFormProps {
  authType: AuthType;
  onSubmit: (data: IUser) => void;
}

function AuthForm({ authType, onSubmit }: IAuthFormProps) {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  const formTitle = getFormTitle(authType);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    getValues,
  } = useForm<IUser>({
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const trimFormData = (data: IUser) => {
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
    const fieldsToValidate: Array<keyof IUser> = ["username", "password"];

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

  const onSubmitForm = (data: IUser) => {
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
        {...register("username", {
          required: "Required field",
          validate: (value) => {
            const trimmedValue = value.trim();
            if (trimmedValue.length < MIN_USERNAME_LENGTH) {
              return `Your username needs to be at least ${MIN_USERNAME_LENGTH} characters.`;
            }
            return true;
          },
          maxLength: {
            value: MAX_USERNAME_LENGTH,
            message: `Your username should not be more than ${MAX_USERNAME_LENGTH} characters.`,
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
        {...register("password", {
          required: "Required field",
          validate: (value) => {
            const trimmedValue = value.trim();
            if (trimmedValue.length < MIN_PASSWORD_LENGTH) {
              return `Your password needs to be at least ${MIN_PASSWORD_LENGTH} characters.`;
            }
            return true;
          },
          maxLength: {
            value: MAX_PASSWORD_LENGTH,
            message: `Your password should not be more than ${MAX_PASSWORD_LENGTH} characters.`,
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
