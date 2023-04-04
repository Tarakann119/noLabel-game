import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { User } from './API/models/User';
import { users } from './API/routes/userRoutes';
import { initPostgreSQLConnection } from './db';

dotenv.config();

initPostgreSQLConnection();

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.get('/ping', (_, res) => {
  res.json('👋 pong');
});

app.get('/db-test', async (_, res) => {
  await User.sync({ alter: true });
  res.json('👋 db-test');
});

app.use('/', users);

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
