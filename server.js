const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');

const company = require('./routes/companyRoutes');
const session = require('./routes/sessionRoutes');
const user = require('./routes/userRoutes');
const hpp = require('hpp');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());

const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 mins
  max: 50,
});
app.use(limiter);

app.get('/', (req, res) => res.send('Express on Vercel'));
app.use('/company', company);
app.use('/auth', user);
app.use('/sessions', session);
app.use('/uploads', express.static('uploads'));

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

module.exports = app;
