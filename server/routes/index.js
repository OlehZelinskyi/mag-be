import Router from "express";

import { SUCCESS, PATH_MESSAGE } from "../constants.js";
import messageRoute from "./messageRoutes.js";

const router = Router();

router.get(`/`, (req, res) => {
  res.status(SUCCESS).send({
    message: "Welcome Home ;)",
  });
});

router.use(`/${PATH_MESSAGE}`, messageRoute);

router.use("*", (req, res) => {
  res.status(SUCCESS).send({
    message: "Welcome to this API.",
  });
});

export default router;
