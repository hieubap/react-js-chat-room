import { API } from "@src/constants";
import baseProvider from "./base-provider";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ...baseProvider(API.post),
};
