import http from "./httpService";

const endpoint = "/api/v1/bid";

export async function AddNewBid(bid) {
  return await http.post(endpoint + "/addNewBid", bid, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function GetAllBidsByEmployer(id){
    return await http.get(endpoint + `/getAllBidsByEmployer/${id}`);
}
export async function GetAllBidsByTask(id) {
  return await http.get(endpoint + `/getAllBidsByTask/${id}`);
}

export async function GetAllBidsByProfessional(id) {
  return await http.get(endpoint + `/getAllBidsByProfessional/${id}`);
}

export async function UpdateBidStatus(bid){
    return await http.put(endpoint + "/updateBidStatus", bid);
}

export async function DeleteBidById(id) {
  return await http.delete(endpoint + `/deleteBid/${id}`);
}