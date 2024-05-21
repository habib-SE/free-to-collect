
import './config/config.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import Auth from './routes/user-route.js';
import Donation from './routes/donate-route.js';
import Booking from './routes/booking-route.js';

const app = express();
dotenv.config();
//middelwares
app.use(cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet({ crossOriginResourcePolicy: false, }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); // Example limit of 10MB
app.use(bodyParser.json())

app.use('/api', Auth, Donation, Booking)


app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist please put Api prod routes ..'
    })
});
const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});