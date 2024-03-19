import React from "react";
import { useForm } from "react-hook-form";
import { Questionnaire, Question } from "../../types/questionnaireTypes";
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

const DynamicForm: React.FC<{ questionnaire: Questionnaire }> = ({
  questionnaire,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();
  // Example form data structure
  interface FormData {
    // Define structure based on your actual data needs
    [questionId: string]: string | boolean | number;
  }
  const defaultValues = {
    
  }
  const onSubmit = (data: any) => {
    console.log("Test submission!");
    console.log(data);
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
                  bgcolor: "grey.100",
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
                  <FormLabel component="legend">{question.text}</FormLabel>
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
                  bgcolor: "grey.100",
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
                />
              </Box>
            );
          case "rating":
            return (
              <Box
                key={index}
                sx={{
                  bgcolor: "grey.100",
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
                  <FormLabel component="legend">{question.text}</FormLabel>
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
                  bgcolor: "grey.100",
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
                  <FormLabel component="legend">{question.text}</FormLabel>
                  <TextField
                    {...register(question.id)}
                    variant="outlined"
                    margin="normal"
                    error={!!errors[question.id]}
                    helperText={errors[question.id]?.message}
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
