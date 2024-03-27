import React from "react";
import { useForm } from "react-hook-form";
import {
  Questionnaire,
  Question,
  FormData,
  SubmissionPayload,
} from "../../types/questionnaireTypes";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  Switch,
  TextField,
  filledInputClasses,
  Button,
} from "@mui/material";
import { error } from "console";
import { useMutation } from "react-query";
import { questionnaireNewSubmission } from "../../services/questionnaireService";

const DynamicForm: React.FC<{ questionnaire: Questionnaire }> = ({
  questionnaire,
}) => {
  // React Hook Form setup here...
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  // React Query's useMutation hook
  const { isLoading, isError, data, error } = useMutation({
    // Optional: OnSuccess, onError, onSettled callbacks.
  });

  const { mutate } = useMutation((payload: SubmissionPayload) =>
    questionnaireNewSubmission(payload)
  );

  const onSubmit = (formData: FormData) => {
    const userId = localStorage.getItem("userId") || "";

    const submissionPayload = {
      questionnaireId: questionnaire.id,
      answers: formData,
      userId,
    };
    mutate(submissionPayload);
  };
  const handleRatingChange =
    (questionId: string) => (event: any, newValue: any) => {
      setValue(questionId, newValue);
    };
  const clearForm = () => {
    reset(); // React hook form import - resets all inputs to their initial values
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input form fields with switch cases from json schema*/}
      {questionnaire.questions.map((question, index) => {
        switch (question.type) {
          case "multipleChoice":
            const options = question.options || [];
            return (
              <Box
                key={index}
                sx={{
                  bgcolor: "grey.900",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                  padding: 2, // Adjust padding as needed
                  mb: 2,
                }}
              >
                <FormControl
                  component="fieldset"
                  sx={{ color: "#fff", "& .MuiSvgIcon-root": { fill: "#fff" } }}
                >
                  <FormLabel component="legend" sx={{ color: "#fff" }}>
                    {question.text}
                  </FormLabel>
                  <RadioGroup
                    aria-label={question.text}
                    defaultValue={question.placeholder}
                    name={question.type}
                  >
                    {options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={option.toString()}
                        control={<Radio />}
                        label={option.toString()}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            );
          case "boolean":
            return (
              <Box
                key={index}
                sx={{
                  bgcolor: "grey.900",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                  padding: 2, // Adjust padding as needed
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={<Switch {...register(question.id)} />}
                  label={question.text}
                  sx={{ color: "#fff", "& .MuiSvgIcon-root": { fill: "#fff" } }}
                />
              </Box>
            );
          case "rating":
            return (
              <Box
                key={index}
                sx={{
                  bgcolor: "grey.900",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                  padding: 2, // Adjust padding as needed
                  mb: 2,
                  color: "#fff",
                }}
              >
                <FormControl
                  component="fieldset"
                  sx={{ color: "#fff", "& .MuiSvgIcon-root": { fill: "#fff" } }}
                >
                  <FormLabel component="legend" sx={{ color: "#fff" }}>
                    {question.text}
                  </FormLabel>
                  <Rating
                    name={question.id}
                    onChange={handleRatingChange(question.id)}
                  />
                </FormControl>
              </Box>
            );
          case "textInput":
            return (
              <Box
                key={index}
                sx={{
                  bgcolor: "grey.900",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                  padding: 2, // Adjust padding as needed
                  mb: 2,
                }}
              >
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ color: "#fff" }}>
                    {question.text}
                  </FormLabel>
                  <TextField
                    {...register(question.id)}
                    variant="outlined"
                    margin="normal"
                    error={!!errors[question.id]}
                    helperText={errors[question.id]?.message}
                    sx={{
                      outlineColor: "#fff",
                      color: "#fff",
                      "& .MuiSvgIcon-root": { fill: "#fff" },
                    }}
                  />
                </FormControl>
              </Box>
            );
        }
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={clearForm} variant="outlined" color="secondary">
          Clear
        </Button>
      </Box>
    </form>
  );
};

export default DynamicForm;
