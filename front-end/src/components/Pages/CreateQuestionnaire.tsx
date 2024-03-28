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
import QuestionnaireDetailsFields from "../QuestionnaireTitleField/QuestionnaireTitles";

const CreateQuestionnaire: React.FC = () => {
  // Using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
              <QuestionnaireDetailsFields />
              <Button type="submit" variant="contained" color="primary">
                Add New Question
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Box>
    </div>
  );
};

export default CreateQuestionnaire;
