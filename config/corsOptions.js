import { allowedOrigins } from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    // Todo after  devlopment we have to remove ==> !origin
    //also we have to remove the locahost from allowedOrigins array
    //add the main url where your client is live
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
