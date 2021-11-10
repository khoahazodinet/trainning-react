import Api from "./axios";

const calculatorApi = {
  get: (data) => {
    const url = '/calculate?' +
    `bill=${data.bill}&people=${data.personCount}&tipPercent=${data.tip}`;
    return Api.get(url);
  },
}

export default calculatorApi;