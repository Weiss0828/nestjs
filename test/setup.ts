import { rm } from "fs/promises";
import { join } from "path";
import { getConnection } from "typeorm";

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, "..", "testing.sqlite"));
  } catch (error) {}
});

global.afterEach(async () => {
  const conn = getConnection();
  await conn.close();
});
