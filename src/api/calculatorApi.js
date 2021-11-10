import axios from "./axios";

const calculatorApi = {
  get: (bill, tip, personCount) => {
    const url = '/calculate?' +
    `bill=${bill}&people=${personCount}&tipPercent=${tip}`;
    console.log(url);
    return axios.get(url);
  },
}

export default calculatorApi;