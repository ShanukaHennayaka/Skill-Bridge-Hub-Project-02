import http from "./httpService";

const endpoint = "/api/v1/recover";

export async function SendVerifyCode(recover){
    return await http.post(endpoint + "/sendVerificationCode", recover);
}

export async function ChangePassword(recover) {
  return await http.post(endpoint + "/changePassword", recover);
}