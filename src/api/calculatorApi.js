import axios from "./axios";

const calculatorApi = {
  get: (data) => {
    const url = '/calculate?' +
    `bill=${data.bill}&people=${data.personCount}&tipPercent=${data.tip}`;
    console.log(url);
    return axios.get(url);
  },
}

export default calculatorApi;