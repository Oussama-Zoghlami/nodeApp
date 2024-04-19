import * as env from "dotenv";
env.config();

const { URI, PORT, SECRET_ACCESS_TOKEN } = process.env;

export { URI, PORT, SECRET_ACCESS_TOKEN };