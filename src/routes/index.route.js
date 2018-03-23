import authRoute from "./auth.route";
import * as express from "express";

const apiRoutes = [authRoute];
const route = express.Router();


route.use("/api", apiRoutes);

export default route;