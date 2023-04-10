import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { forumTopic } from './API/routes/forumTopicRoutes';
import { themes } from './API/routes/themeRoutes';
import { users } from './API/routes/userRoutes';
import { initPostgreSQLConnection } from './db';

dotenv.config();

initPostgreSQLConnection();

const app = express();
app.use(cors());
const port = process.env.SERVER_PORT || 3001;

app.use('/user', users);
app.use('/theme', themes);
app.use('/forum', forumTopic);

app.listen(port, () => {
  console.log(`➜ Server is listening on port: ${port}`);
});
