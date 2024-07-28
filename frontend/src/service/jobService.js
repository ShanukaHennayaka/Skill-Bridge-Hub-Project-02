import http from "./httpService";

const endpoint = "/api/v1/job";

export async function GetAllEmployerJobs(id) {
  return await http.get(endpoint + `/getAllEmployerJobs/${id}`);
}
export async function GetAllProfessionalJobs(id) {
  return await http.get(endpoint + `/getAllProfessionalJobs/${id}`);
}

export async function UpdateJobStatus(job) {
  return await http.put(endpoint + "/updateJobStatus", job);
}

export async function DeliverJob(formData) {
  return await http.put(endpoint + "/deliverJob", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function AcceptJob(job) {
  return await http.put(endpoint + "/acceptJob", job);
}
export async function MakePayment(id) {
  return await http.put(endpoint + `/payment/${id}`, {});
}

export async function GiveFeedback(feedback){
    return await http.put(endpoint + "/giveFeedback", feedback);
}