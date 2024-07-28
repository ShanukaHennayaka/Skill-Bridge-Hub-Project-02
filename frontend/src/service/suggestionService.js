import http from "./httpService";

const endpoint = "/api/v1/suggestion";

export async function SendBidRequestEmail(request){
    return await http.post(endpoint + "/sendBidRequestEmail", request);
}
