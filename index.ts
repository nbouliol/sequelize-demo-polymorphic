import type { Schema } from "./typings";

import "dotenv/config";
import { createAgent } from "@forestadmin/agent";
import { createSequelizeDataSource } from "@forestadmin/datasource-sequelize";
import { sequelize } from "./models";

// This object allows to configure your Forest Admin panel
const agent = createAgent<Schema>({
  // Security tokens
  authSecret: process.env.FOREST_AUTH_SECRET!,
  envSecret: process.env.FOREST_ENV_SECRET!,
  forestServerUrl: process.env.FOREST_SERVER_URL!,

  // Make sure to set NODE_ENV to 'production' when you deploy your project
  isProduction: process.env.NODE_ENV === "production",

  // Autocompletion of collection names and fields
  typingsPath: "./typings.ts",
  typingsMaxDepth: 5,
});

// Connect your datasources
// All options are documented at https://docs.forestadmin.com/developer-guide-agents-nodejs/data-sources/connection
// agent.addDataSource(
//   createSqlDataSource({
//     uri: process.env.DATABASE_URL,
//     schema: process.env.DATABASE_SCHEMA,
//     sslMode: process.env.DATABASE_SSL_MODE as SslMode,
//   })
// );

agent.addDataSource(createSequelizeDataSource(sequelize));

// Expose an HTTP endpoint.
agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT));

// Start the agent.
agent.start().catch((error) => {
  console.error("\x1b[31merror:\x1b[0m Forest Admin agent failed to start\n");
  console.error("");
  console.error(error.stack);
  process.exit(1);
});
