import authRoute from "./auth.route";
import * as express from "express";

const allRoutes = [authRoute];
const apiRoute = express.Router();

apiRoute.use("/api", allRoutes);

export default apiRoute;