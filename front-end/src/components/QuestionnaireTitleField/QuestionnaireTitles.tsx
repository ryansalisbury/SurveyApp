import React from "react";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const QuestionnaireDetailsFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Accessing form context

  return (
    <>
      <TextField
        label="Questionnaire Title"
        variant="outlined"
        {...register("title", { required: "Title is required" })}
        error={Boolean(errors.title)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Questionnaire ID"
        variant="outlined"
        {...register("id", { required: "ID is required" })}
        error={Boolean(errors.id)}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default QuestionnaireDetailsFields;
