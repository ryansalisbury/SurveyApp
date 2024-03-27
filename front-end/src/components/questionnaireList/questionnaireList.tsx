import React, { useEffect, useState } from "react";
import {
  fetchQuestionnairesNames,
  deleteQuestionnaireAndSubmittedAnswers,
} from "../../services/questionnaireService";
import { Questionnaire } from "../../types/questionnaireTypes";
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { string } from "yup";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { PsychologyAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteIcon from "@mui/icons-material/Delete";
const QuestionnaireList: React.FC = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    mutate: deleteQuestionnaire,
    isLoading: isMutationLoading,
    isError: isMutationError,
  } = useMutation(deleteQuestionnaireAndSubmittedAnswers, {
    onSuccess: () => {
      // Basically refreshes the questionnaireNames once the delete mutation is successful
      queryClient.invalidateQueries("questionnaireNames");
    },
  });
  const {
    data: questionnaireNames,
    isLoading: isQueryLoading,
    error: queryError,
  } = useQuery<{ id: string; title: string }[], Error>(
    "questionnaireNames",
    fetchQuestionnairesNames
  );

  const handleNavigate = (id: string) => {
    navigate(`/questionnaire/${id}`);
  };
  if (isQueryLoading) return <div>Loading...</div>;
  if (queryError) return <div>Error: {queryError.message}</div>;

  if (isMutationLoading) return <div>Deleting...</div>;
  // Mutation errors are not handled like reg errors (see above)

  return (
    <List dense={true}>
      {questionnaireNames?.map(({ id, title }) => (
        <ListItem
          key={id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation(); // Prevent triggering any parent click events
                deleteQuestionnaire(id); // Call the mutate function with the questionnaire ID
              }}
            >
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          }
        >
          <ListItemButton key={id} onClick={() => handleNavigate(id)}>
            <ListItemIcon>
              <PsychologyAltIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={title} sx={{ whiteSpace: "nowrap" }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    // format data approporately to be displayed as a list
  );
};

export default QuestionnaireList;
