import React from "react";
import NavBar from "../nav-bar/NavBar";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import QuestionnaireTitleFields from "../QuestionnaireTitleField/QuestionnaireTitles";
import { Question, Questionnaire } from "../../types/questionnaireTypes";
import { useMutation } from "react-query";
import { createQuestionnaireApi } from "../../services/questionnaireService";

const CreateQuestionnaire: React.FC = () => {
  const methods = useForm<Questionnaire>();

  {
    /*Ok so the useMutation hook and mutate 
    function is used to trigger an asynchronous operation,
    like data submission (Our createQuestionnaireApi() method). */
  }
  const { mutate, isLoading, isError, error } = useMutation(
    createQuestionnaireApi,
    {
      onSuccess: (data: Questionnaire) => {
        // Handle successful submission
        // For example, show a success message or redirect
        console.log("Questionnaire created:", data);
      },
      onError: (error) => {
        // Handle any errors
        console.error("Error creating questionnaire:", error);
      },
    }
  );

  const onSubmit = (data: Questionnaire) => {
    mutate(data); // Use mutate to trigger the mutation
  };

  return (
    <div>
      <NavBar />
      <Box
        sx={{
          my: 4,
          bgcolor: "#282c34",
          p: 2,
          borderRadius: "4px",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ color: "inherit" }}
        >
          Custom Questionnaire Creation
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack
              spacing={2}
              sx={{ width: "100%", maxWidth: 500, margin: "auto" }}
            >
              <QuestionnaireTitleFields />
              <Button type="submit" variant="contained" color="primary">
                Add New Question
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </form>
        </FormProvider>
        {isError && (
          <div style={{ color: "red" }}>
            {error instanceof Error ? error.message : "An error occurred"}
          </div>
        )}
      </Box>
    </div>
  );
};

export default CreateQuestionnaire;
