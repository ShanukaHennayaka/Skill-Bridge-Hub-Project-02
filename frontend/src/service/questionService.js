import http from "./httpService";

const endpoint = "/api/v1/question";

export async function AddNewQuestion(question){
    return await http.post(endpoint + "/addNewQuestion", question);
}

export async function GetAllQuestions(){
    return await http.get(endpoint + "/allQuestions");
}