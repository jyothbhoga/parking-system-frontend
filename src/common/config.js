const config = {};
config.BASE_DOMAIN = process.env.REACT_APP_DOMAIN;
config.API_BASE_DOMAIN = process.env.REACT_APP_API_URL;
config.ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPT_KEY;
config.API_BASE_URL = "/api";
config.API_VEHICLE_URL = "/vehicles";
config.API_ADMIN_URL = "/admin";
config.IMG_BASE = "/assets/images/";

config.pageLimit = 10;

config.enumStaticUrls = {
  login: "login",
  view: "view",
  edit: "edit",
  add: "add",
  vehicleList: "vehicles",
  tokenView: "token-view",
};

config.enumVehicleType = [
  { name: "2 Wheeler", id: 1 },
  { name: "4 Wheeler", id: 2 },
];

config.enumBldgNames = [
  { name: "Satyam", id: 1 },
  { name: "Shivam", id: 2 },
  { name: "Sundaram", id: 3 },
];

config.toastDuration = 5000;
config.expirationTime = 3600 * 1000;
export default config;
