import React from "react";
import { useForm } from "react-hook-form";
import { Questionnaire, Question } from "../../types/questionnaireTypes";


const DynamicForm: React.FC<{ questionnaire: Questionnaire }> = ({
  questionnaire,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input form fields with switch cases from json schema*/}
      {questionnaire.questions.map((question, index) => {
        switch (question.type) {
          case "multipleChoice":
            return <h1>multipleChoice Question formatting here</h1>;
          case "boolean":
            return <h1>Boolean Question formatting here</h1>;
          case "rating":
            return <h1>Insert rating header question formatting here here</h1>;
          case "textInput":
            return <h1>Insert textInput question formatting here.</h1>;
        }
      })}
      <input type="submit" />
    </form>
  );
};

export default DynamicForm;
