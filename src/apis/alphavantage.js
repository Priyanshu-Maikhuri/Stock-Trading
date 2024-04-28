import axios from "axios";

const api_key = "DQVBFB083PDWKBQT"; //"4R6RGHQLTLF7IAEE";
export default axios.create({
  baseURL: "https://www.alphavantage.co",
  params: { apikey: api_key },
});
