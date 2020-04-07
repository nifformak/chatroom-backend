import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

const PORT = process.env.PORT || 3000;

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true
});

import createRoutes from './core/routes';
  import createSocket from './core/socket';

const app = express();
const http = createServer(app);
createSocket(http);

createRoutes(app);

http.listen(PORT, function() {
   console.log(`Server: http://localhost:${PORT}`);
});