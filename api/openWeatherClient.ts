import axios from "axios";

const openWeatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: "00f3e919ccb70d786c99afde01d0fff3", // This should be in an env file or secret manager
  },
});

export default openWeatherClient;
