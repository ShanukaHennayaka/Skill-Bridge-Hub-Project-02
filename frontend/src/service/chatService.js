import http from "./httpService";

const endpoint = "/api/v1/chat";

export async function AddNewMessage(message) {
    return await http.put(endpoint+"/addNewMessage",message);
}

export async function GetChatById(chatId) {
    return await http.get(endpoint + `/getChatById/${chatId}`);
}