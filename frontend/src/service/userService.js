import http from "./httpService";
import { jwtDecode } from "jwt-decode";

const endpoint = "/api/v1/user";

export async function LoginUser(user) {
  return await http.post(endpoint + "/login", user);
}

export async function RegisterUser(user) {
  return await http.post(endpoint + "/register", user);
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    const temp_user = jwtDecode(token);
    const { data: user } = await http.get(
      endpoint + `/getUserById/${temp_user._id}`
    );
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
}

export async function GetAllUsers() {
  return await http.get(endpoint + "/getAllUsers");
}

export async function UpdateUserDetails(user) {
  return await http.put(endpoint + "/updateUser", user);
}

export async function UpdateVerification(verification) {
  return await http.put(endpoint + "/updateVerification", verification);
}

export async function UpdateUserStatus(id) {
  return await http.put(endpoint + `/updateUserStatus/${id}`);
}
export async function DeleteUser(id) {
  return await http.delete(endpoint + `/deleteUser/${id}`);
}
