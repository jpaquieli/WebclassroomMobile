// constants/config.ts
import Constants from "expo-constants";

// 💡 Use o IP da sua máquina para acessar o backend no emulador iOS/Android
const LOCAL_API = "http://127.0.0.1:3000"; // iOS
// const LOCAL_API = "http://10.0.2.2:3000"; // Android

export const CONFIG = {
  API_BASE_URL: Constants.expoConfig?.extra?.apiUrl || LOCAL_API,
};