import http from "./httpService";

const endpoint = "/api/v1/verification";

export async function AddNewVerification(verification){
    return await http.post(endpoint + "/addNewVerification", verification);
}

export async function GetAllVerifications(){
    return await http.get(endpoint + "/getAllVerifications");
}