import { API } from "@constants";
import baseProvider from "./base-provider";

export default {
  ...baseProvider(API.post),
};
