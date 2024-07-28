import http from "./httpService";

const endpoint = "/api/v1/notification";

export async function GetAllNotifications(id){
    return await http.get(endpoint + `/getAllNotifications/${id}`);
}

export async function DeleteNotification(id){
    return await http.delete(endpoint + `/deleteNotification/${id}`);
}