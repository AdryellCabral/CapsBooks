import { createConnection } from "typeorm";

const connection = () => {
  return createConnection();
};

export default connection;
