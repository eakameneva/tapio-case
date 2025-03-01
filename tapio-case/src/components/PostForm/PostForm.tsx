import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextField } from "@mui/material";

const TITLE_MAX_LENGTH = 100;

interface IPostFormValues {
  title: string;
  body: string;
}

interface IPostFormProps {
  formTitle: string;
  onSubmit: (data: IPostFormValues) => void;
  initialData?: IPostFormValues;
}

function PostForm({ formTitle, onSubmit, initialData }: IPostFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: initialData,
  });

  const trimFormData = (data: IPostFormValues) => {
    const trimmedData = {
      ...data,
      title: data.title.trim(),
      body: data.body.trim(),
    };
    return trimmedData;
  };

  const validateForm = () => {
    const values = getValues();
    let hasError = false;
    const fieldsToValidate: Array<keyof IPostFormValues> = ["title", "body"];

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
  const onSubmitForm = (data: IPostFormValues) => {
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
        required
        id="outlined-required"
        label="Title"
        fullWidth={true}
        {...register("title", {
          required: "Required field",
          maxLength: {
            value: TITLE_MAX_LENGTH,
            message: `Title cannot exceed ${TITLE_MAX_LENGTH} characters`,
          },
        })}
      />
      <div className="text-red-600">
        {errors?.title && <span>{errors?.title?.message || "Error"}</span>}
      </div>
      <br />
      <TextField
        required
        id="outlined-required"
        label="Text"
        multiline
        minRows={3}
        maxRows={10}
        fullWidth={true}
        {...register("body", {
          required: "Required field",
        })}
      />
      <div className="text-red-600">
        {errors?.body && <span>{errors?.body?.message || "Error"}</span>}
      </div>
      <br />
      <Button
        onClick={handleSubmit(onSubmitForm)}
        variant="outlined"
        endIcon={<SendIcon />}
        sx={{
          color: "#2eb7af",
          borderColor: "#2eb7af",
          "&:hover": {
            backgroundColor: "#2eb7af",
            color: "white",
          },
        }}
      >
        Send
      </Button>
    </form>
  );
}

export default PostForm;
