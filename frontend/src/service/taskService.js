import http from "./httpService";

const endpoint = "/api/v1/task";

export async function AddNewTask(task) {
  return await http.post(endpoint + "/addNewTask", task, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function UpdateTask(id,task) {
  return await http.put(endpoint + `/updateTask/${id}`, task, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function GetAllTasks() {
  return await http.get(endpoint + "/getAllTasks");
}

export async function GetTaskById(id) {
  return await http.get(endpoint + `/getTaskById/${id}`);
}
export async function GetAllTaskByUser(id) {
  return await http.get(endpoint + `/getAllTasksByUser/${id}`);
}
export async function GetAllTaskByCategory(category) {
  return await http.get(endpoint + `/getAllTasksByCategory/${category}`);
}

export async function UpdateBiddingStatus(id) {
  return await http.put(endpoint + `/updateBiddingStatus/${id}`, {});
}

export async function DeleteTask(id){
  return await http.delete(endpoint + `/deleteTask/${id}`);
}