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
  filledInputClasses,
} from "@mui/material";

const DynamicForm: React.FC<{ questionnaire: Questionnaire }> = ({
  questionnaire,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  // Example form data structure
  interface FormData {
    // Define structure based on your actual data needs
    [questionId: string]: string | boolean | number;
  }
  const onSubmit = (data: any) => {
    console.log(data);
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
                sx={{
                  bgcolor: "grey.100",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                }}
              >
                <FormControl key={index} component="fieldset">
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
                sx={{
                  bgcolor: "grey.100",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                }}
              >
                <FormControlLabel
                  key={index}
                  control={<Switch {...register(question.id)} />}
                  label={question.text}
                />
              </Box>
            );
          case "rating":
            return (
              <Box
                sx={{
                  bgcolor: "grey.100",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                }}
              >
                <FormControl key={index} component="fieldset">
                  <FormLabel component="legend">{question.text}</FormLabel>
                </FormControl>
              </Box>
            );
          case "textInput":
            return (
              <Box
                sx={{
                  bgcolor: "grey.100",
                  width: "auto",
                  maxWidth: 360,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: "16px",
                }}
              >
                <FormControl key={index} component="fieldset">
                  <FormLabel component="legend">{question.text}</FormLabel>
                </FormControl>
              </Box>
            );
        }
      })}
      <input type="submit" />
    </form>
  );
};

export default DynamicForm;
