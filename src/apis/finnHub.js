import axios from "axios";

const TOKEN = "co6plb1r01qj6a5mcqr0co6plb1r01qj6a5mcqrg";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: { token: TOKEN },
});
