import express from 'express'
import UserRouter from './routes/user.route.js';
import connectDB from './DB.js';
import cors from 'cors';
import ExpenseItemRouter from './routes/expenseItem.route.js';



const app = express()
app.use(cors());

app.use(cors({
    origin: '*',  // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow multiple HTTP methods
    credentials: true, // Allow cookies and credentials to be sent
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', UserRouter);
app.use('/expenseItem', ExpenseItemRouter)

app.get('/', (req, res) => {
    res.send("Hello App")
})

app.listen(3030, () => {
    connectDB();
    console.log("@3030")
})