import React, { useEffect, useState } from "react";
import { fetchQuestionnairesNames } from "../../services/questionnaireService";
import { Questionnaire } from "../../types/questionnaireTypes";
import { Button, List, ListItemButton, ListItemIcon } from "@mui/material";
import { string } from "yup";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { PsychologyAlt } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const QuestionnaireList: React.FC = () => {
  // const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);
  // const [questionnaireNames, setQuestionnaireNames] = useState<
  //   { id: string; title: string }[]
  // >([]);

  // useEffect(() => {
  //   fetchQuestionnairesNames().then((data) => {
  //     setQuestionnaireNames(data);
  //   });
  // }, []);
  const navigate = useNavigate();

  const {
    data: questionnaireNames,
    isLoading,
    error,
  } = useQuery<{ id: string; title: string }[], Error>(
    "questionnaireNames",
    fetchQuestionnairesNames
  );

  const handleNavigate = (id: string) => {
    console.log(`Navigating to questionnaire with ID: ${id}`); // Temporarily log the ID
    navigate(`/questionnaire/${id}`);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <List dense={true}>
      {questionnaireNames?.map(({ id, title }) => (
        <ListItemButton key={id} onClick={() => handleNavigate(id)}>
          <ListItemIcon>
            <PsychologyAltIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={title} sx={{ whiteSpace: "nowrap" }} />
        </ListItemButton>
      ))}
    </List>
    // format data approporately to be displayed as a list
  );
};

export default QuestionnaireList;
