const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');

const company = require('./routes/companyRoutes');
const session = require('./routes/sessionRoutes');
const user = require('./routes/userRoutes');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

app.use('/companies', company);
app.use('/auth', user);
app.use('/sessions', session);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

// eslint-disable-next-line
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
