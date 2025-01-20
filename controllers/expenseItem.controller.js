import ExpenseItem from "../Schema/expenseItem.schema.js";
import User from "../Schema/user.schema.js";


export const getAllExpenseItems = async (req, res) => {
    const { userId } = req.params;
    try {
        const expenseItems = await ExpenseItem.find({ userId });
        res.status(200).json(expenseItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new expense item
export const createExpenseItem = async (req, res) => {
    const {
        userId,
        title,
        amount,
        date,
        category,
        paymentMethod,
        location,
        subLocation,
        currency
    } = req.body;

    try {
        const getUser = await User.findOne({ userId });
        if (!getUser) {
            return res.status(404).send({ message: "User Not Found" })
        }
        const expenseItem = new ExpenseItem({
            userId, // Associate with the user
            title,
            amount,
            date,
            category,
            paymentMethod,
            location,
            subLocation,
            currency: "USD"
        });

        try {
            const newExpenseItem = await expenseItem.save();
            res.status(201).json(newExpenseItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

};

// Delete an expense item
export const deleteExpenseItem = async (req, res) => {
    const { userId } = req.body;
    try {

        const expenseItem = await ExpenseItem.findById(req.params.id);
        if (!expenseItem) {
            return res.status(404).json({ message: 'Expense item not found' });
        }

        if (expenseItem.userId != userId) {
            return res.status(404).json({ message: 'Expense item not found in your List' });
        }

        await ExpenseItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an expense item by ID
export const getExpenseItemById = async (req, res) => {
    const { userId } = req.body;
    try {
        const expenseItem = await ExpenseItem.findById(req.params.id);
        if (!expenseItem) {
            return res.status(404).json({ message: 'Expense item not found' });
        }
        if (expenseItem.userId != userId) {
            return res.status(404).json({ message: 'Expense item not found in your List' });
        }
        res.status(200).json(expenseItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const add = async (req, res) => {
    const False = false;
    const True = true;
    const array = [
        { 'title': 'Doctor Visit', 'amount': 23.5, 'category': 'Entertainment', 'date': '2024-04-06T04:43:23.502014', 'paymentMethod': 'Mobile Payment', 'location': 'Chicago', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 61.48, 'category': 'Utilities', 'date': '2024-04-06T00:19:23.502058', 'paymentMethod': 'Debit Card', 'location': 'Chicago', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 40.77, 'category': 'Utilities', 'date': '2024-07-07T12:39:23.502080', 'paymentMethod': 'Cash', 'location': 'Denver', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 12.44, 'category': 'Utilities', 'date': '2024-07-28T13:23:23.502098', 'paymentMethod': 'Credit Card', 'location': 'Online', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 18.41, 'category': 'Food & Dining', 'date': '2024-01-08T23:25:23.502117', 'paymentMethod': 'Cash', 'location': 'Denver', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 71.42, 'category': 'Food & Dining', 'date': '2024-03-07T10:55:23.502136', 'paymentMethod': 'Credit Card', 'location': 'Seattle', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 85.48, 'category': 'Shopping', 'date': '2024-05-06T13:27:23.502156', 'paymentMethod': 'Debit Card', 'location': 'Chicago', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': False },
        { 'title': 'Ride', 'amount': 20.97, 'category': 'Food & Dining', 'date': '2024-12-12T03:23:23.502173', 'paymentMethod': 'Cash', 'location': 'Miami', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 60.11, 'category': 'Shopping', 'date': '2024-09-14T14:56:23.502193', 'paymentMethod': 'Mobile Payment', 'location': 'Houston', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 39.64, 'category': 'Utilities', 'date': '2024-06-09T22:10:23.502212', 'paymentMethod': 'Debit Card', 'location': 'Miami', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 22.6, 'category': 'Transportation', 'date': '2024-06-28T19:26:23.502232', 'paymentMethod': 'Credit Card', 'location': 'Miami', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 78.06, 'category': 'Health', 'date': '2024-01-10T03:30:23.502249', 'paymentMethod': 'Debit Card', 'location': 'Boston', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 89.08, 'category': 'Transportation', 'date': '2024-11-29T06:22:23.502268', 'paymentMethod': 'Mobile Payment', 'location': 'Boston', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': True },
        { 'title': 'Doctor Visit', 'amount': 61.92, 'category': 'Entertainment', 'date': '2024-10-15T19:45:23.502285', 'paymentMethod': 'Mobile Payment', 'location': 'Los Angeles', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 45.47, 'category': 'Food & Dining', 'date': '2024-09-01T06:46:23.502302', 'paymentMethod': 'Mobile Payment', 'location': 'Houston', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 98.28, 'category': 'Shopping', 'date': '2024-07-13T00:28:23.502321', 'paymentMethod': 'Mobile Payment', 'location': 'Online', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 45.78, 'category': 'Utilities', 'date': '2024-12-21T01:54:23.502338', 'paymentMethod': 'Debit Card', 'location': 'Miami', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 5.85, 'category': 'Shopping', 'date': '2024-07-20T01:58:23.502358', 'paymentMethod': 'Mobile Payment', 'location': 'Houston', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 73.01, 'category': 'Health', 'date': '2024-07-08T10:12:23.502378', 'paymentMethod': 'Cash', 'location': 'Seattle', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 91.51, 'category': 'Health', 'date': '2024-11-28T04:49:23.502397', 'paymentMethod': 'Cash', 'location': 'New York', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': True },
        { 'title': 'Doctor Visit', 'amount': 79.69, 'category': 'Shopping', 'date': '2023-12-29T09:25:23.502416', 'paymentMethod': 'Credit Card', 'location': 'San Francisco', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 38.22, 'category': 'Utilities', 'date': '2024-06-17T23:15:23.502433', 'paymentMethod': 'Credit Card', 'location': 'Houston', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 67.4, 'category': 'Health', 'date': '2024-08-02T14:04:23.502452', 'paymentMethod': 'Mobile Payment', 'location': 'Miami', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 45.9, 'category': 'Shopping', 'date': '2024-05-01T05:22:23.502471', 'paymentMethod': 'Debit Card', 'location': 'New York', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 42.83, 'category': 'Utilities', 'date': '2024-05-04T08:37:23.502489', 'paymentMethod': 'Debit Card', 'location': 'San Francisco', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 65.1, 'category': 'Entertainment', 'date': '2024-09-02T13:55:23.502507', 'paymentMethod': 'Credit Card', 'location': 'New York', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': True },
        { 'title': 'Doctor Visit', 'amount': 71.76, 'category': 'Shopping', 'date': '2024-07-20T14:43:23.502526', 'paymentMethod': 'Mobile Payment', 'location': 'San Francisco', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 43.33, 'category': 'Shopping', 'date': '2024-08-31T04:25:23.502542', 'paymentMethod': 'Cash', 'location': 'San Francisco', 'subLocation': 'Park', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 35.57, 'category': 'Entertainment', 'date': '2024-10-03T10:16:23.502559', 'paymentMethod': 'Debit Card', 'location': 'San Francisco', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 20.21, 'category': 'Utilities', 'date': '2024-06-18T06:27:23.502575', 'paymentMethod': 'Debit Card', 'location': 'Seattle', 'subLocation': 'Park', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 66.25, 'category': 'Utilities', 'date': '2024-04-28T10:54:23.502591', 'paymentMethod': 'Mobile Payment', 'location': 'New York', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 83.37, 'category': 'Health', 'date': '2024-03-12T07:07:23.502608', 'paymentMethod': 'Cash', 'location': 'Online', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 21.87, 'category': 'Utilities', 'date': '2024-01-29T18:23:23.502624', 'paymentMethod': 'Cash', 'location': 'Miami', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 64.41, 'category': 'Food & Dining', 'date': '2024-04-15T04:10:23.502641', 'paymentMethod': 'Cash', 'location': 'San Francisco', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 61.21, 'category': 'Transportation', 'date': '2024-10-08T09:34:23.502658', 'paymentMethod': 'Mobile Payment', 'location': 'Online', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 81.24, 'category': 'Food & Dining', 'date': '2024-11-16T08:33:23.502676', 'paymentMethod': 'Mobile Payment', 'location': 'Seattle', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 43.48, 'category': 'Transportation', 'date': '2024-04-09T22:13:23.502693', 'paymentMethod': 'Debit Card', 'location': 'Los Angeles', 'subLocation': 'Park', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 58.44, 'category': 'Shopping', 'date': '2024-08-14T10:44:23.502709', 'paymentMethod': 'Mobile Payment', 'location': 'New York', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 70.98, 'category': 'Entertainment', 'date': '2024-07-15T02:25:23.502727', 'paymentMethod': 'Cash', 'location': 'Orlando', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 68.55, 'category': 'Shopping', 'date': '2024-11-11T15:02:23.502744', 'paymentMethod': 'Cash', 'location': 'San Francisco', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 63.75, 'category': 'Health', 'date': '2024-03-09T22:37:23.502761', 'paymentMethod': 'Mobile Payment', 'location': 'San Francisco', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 8.5, 'category': 'Shopping', 'date': '2024-10-26T13:18:23.502778', 'paymentMethod': 'Credit Card', 'location': 'Online', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 42.2, 'category': 'Entertainment', 'date': '2024-06-06T16:31:23.502795', 'paymentMethod': 'Debit Card', 'location': 'New York', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 8.35, 'category': 'Entertainment', 'date': '2024-12-26T04:15:23.502812', 'paymentMethod': 'Cash', 'location': 'Online', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 71.08, 'category': 'Utilities', 'date': '2024-07-13T14:51:23.502831', 'paymentMethod': 'Credit Card', 'location': 'Seattle', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 47.28, 'category': 'Health', 'date': '2024-06-04T11:55:23.502850', 'paymentMethod': 'Credit Card', 'location': 'New York', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 26.67, 'category': 'Transportation', 'date': '2024-01-28T18:56:23.502867', 'paymentMethod': 'Cash', 'location': 'Miami', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 85.84, 'category': 'Entertainment', 'date': '2024-09-30T19:52:23.502884', 'paymentMethod': 'Debit Card', 'location': 'Denver', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 26.92, 'category': 'Shopping', 'date': '2024-07-25T07:04:23.502904', 'paymentMethod': 'Credit Card', 'location': 'Orlando', 'subLocation': 'Park', 'currency': 'USD', 'recurring': False },
        { 'title': 'Ride', 'amount': 64.18, 'category': 'Utilities', 'date': '2024-10-24T20:10:23.502930', 'paymentMethod': 'Debit Card', 'location': 'Houston', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 45.47, 'category': 'Utilities', 'date': '2024-11-11T05:41:23.502951', 'paymentMethod': 'Mobile Payment', 'location': 'Denver', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 25.49, 'category': 'Shopping', 'date': '2024-10-11T20:40:23.502967', 'paymentMethod': 'Debit Card', 'location': 'Orlando', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 83.3, 'category': 'Food & Dining', 'date': '2024-11-03T15:36:23.502984', 'paymentMethod': 'Mobile Payment', 'location': 'Chicago', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 25.29, 'category': 'Shopping', 'date': '2024-08-24T03:01:23.503016', 'paymentMethod': 'Cash', 'location': 'Houston', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 44.89, 'category': 'Shopping', 'date': '2024-04-04T12:57:23.503034', 'paymentMethod': 'Cash', 'location': 'Miami', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 54.36, 'category': 'Health', 'date': '2024-05-26T11:40:23.503050', 'paymentMethod': 'Credit Card', 'location': 'Chicago', 'subLocation': 'University Campus', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 39.56, 'category': 'Transportation', 'date': '2024-04-02T21:49:23.503068', 'paymentMethod': 'Mobile Payment', 'location': 'Chicago', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 55.25, 'category': 'Utilities', 'date': '2024-05-18T13:19:23.503084', 'paymentMethod': 'Credit Card', 'location': 'Chicago', 'subLocation': 'Park', 'currency': 'USD', 'recurring': True },
        { 'title': 'Doctor Visit', 'amount': 83.71, 'category': 'Food & Dining', 'date': '2024-12-01T16:02:23.503100', 'paymentMethod': 'Mobile Payment', 'location': 'Houston', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 8.74, 'category': 'Transportation', 'date': '2024-09-26T02:04:23.503119', 'paymentMethod': 'Debit Card', 'location': 'Denver', 'subLocation': 'University Campus', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 16.55, 'category': 'Shopping', 'date': '2024-05-24T23:51:23.503135', 'paymentMethod': 'Mobile Payment', 'location': 'Orlando', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Ride', 'amount': 20.82, 'category': 'Utilities', 'date': '2024-10-17T16:05:23.503153', 'paymentMethod': 'Mobile Payment', 'location': 'Houston', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 34.88, 'category': 'Shopping', 'date': '2024-08-04T17:02:23.503170', 'paymentMethod': 'Cash', 'location': 'Chicago', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 90.48, 'category': 'Utilities', 'date': '2024-07-08T17:17:23.503188', 'paymentMethod': 'Cash', 'location': 'Chicago', 'subLocation': 'University Campus', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 45.14, 'category': 'Shopping', 'date': '2024-12-08T18:17:23.503204', 'paymentMethod': 'Credit Card', 'location': 'Orlando', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 18.86, 'category': 'Shopping', 'date': '2024-06-13T12:36:23.503220', 'paymentMethod': 'Debit Card', 'location': 'Chicago', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 82.45, 'category': 'Shopping', 'date': '2024-08-20T14:38:23.503237', 'paymentMethod': 'Debit Card', 'location': 'Chicago', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 21.76, 'category': 'Utilities', 'date': '2024-10-03T07:05:23.503253', 'paymentMethod': 'Mobile Payment', 'location': 'Orlando', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 13.6, 'category': 'Shopping', 'date': '2024-11-01T11:14:23.503270', 'paymentMethod': 'Cash', 'location': 'Los Angeles', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 88.19, 'category': 'Entertainment', 'date': '2024-08-15T06:03:23.503286', 'paymentMethod': 'Credit Card', 'location': 'New York', 'subLocation': 'University Campus', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 50.47, 'category': 'Transportation', 'date': '2024-10-29T20:34:23.503303', 'paymentMethod': 'Cash', 'location': 'Seattle', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 23.04, 'category': 'Health', 'date': '2024-02-18T09:02:23.503320', 'paymentMethod': 'Credit Card', 'location': 'New York', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 35.59, 'category': 'Utilities', 'date': '2024-08-19T02:34:23.503337', 'paymentMethod': 'Mobile Payment', 'location': 'Miami', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 29.34, 'category': 'Shopping', 'date': '2024-08-23T00:25:23.503354', 'paymentMethod': 'Credit Card', 'location': 'Los Angeles', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 64.76, 'category': 'Transportation', 'date': '2024-10-19T13:33:23.503371', 'paymentMethod': 'Mobile Payment', 'location': 'Miami', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 85.39, 'category': 'Health', 'date': '2024-02-05T10:28:23.503388', 'paymentMethod': 'Mobile Payment', 'location': 'Online', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 64.82, 'category': 'Food & Dining', 'date': '2024-01-05T03:24:23.503406', 'paymentMethod': 'Mobile Payment', 'location': 'Chicago', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 81.81, 'category': 'Shopping', 'date': '2024-08-13T06:57:23.503426', 'paymentMethod': 'Debit Card', 'location': 'Los Angeles', 'subLocation': 'Park', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 38.41, 'category': 'Shopping', 'date': '2024-08-03T18:57:23.503443', 'paymentMethod': 'Mobile Payment', 'location': 'Boston', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 87.5, 'category': 'Shopping', 'date': '2024-10-18T20:19:23.503460', 'paymentMethod': 'Debit Card', 'location': 'Miami', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 13.27, 'category': 'Health', 'date': '2024-08-07T03:24:23.503478', 'paymentMethod': 'Credit Card', 'location': 'Seattle', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': True },
        { 'title': 'Doctor Visit', 'amount': 45.86, 'category': 'Entertainment', 'date': '2024-03-07T21:40:23.503497', 'paymentMethod': 'Credit Card', 'location': 'Miami', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 45.57, 'category': 'Food & Dining', 'date': '2024-06-08T08:10:23.503514', 'paymentMethod': 'Mobile Payment', 'location': 'Seattle', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 10.71, 'category': 'Entertainment', 'date': '2024-11-05T09:32:23.503531', 'paymentMethod': 'Credit Card', 'location': 'Boston', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': False },
        { 'title': 'Ride', 'amount': 87.91, 'category': 'Food & Dining', 'date': '2024-05-09T03:33:23.503549', 'paymentMethod': 'Debit Card', 'location': 'Seattle', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 46.97, 'category': 'Food & Dining', 'date': '2024-06-13T16:15:23.503569', 'paymentMethod': 'Credit Card', 'location': 'Seattle', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 56.45, 'category': 'Utilities', 'date': '2024-03-12T21:20:23.503587', 'paymentMethod': 'Credit Card', 'location': 'New York', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 11.13, 'category': 'Health', 'date': '2024-09-16T23:18:23.503606', 'paymentMethod': 'Cash', 'location': 'Online', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 14.34, 'category': 'Entertainment', 'date': '2024-07-17T12:06:23.503626', 'paymentMethod': 'Credit Card', 'location': 'Chicago', 'subLocation': 'Airport', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 71.86, 'category': 'Utilities', 'date': '2024-11-03T08:43:23.503645', 'paymentMethod': 'Debit Card', 'location': 'Seattle', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 66.93, 'category': 'Entertainment', 'date': '2024-02-16T23:56:23.503662', 'paymentMethod': 'Credit Card', 'location': 'Houston', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 98.46, 'category': 'Health', 'date': '2024-10-11T19:51:23.503681', 'paymentMethod': 'Mobile Payment', 'location': 'Online', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 28.23, 'category': 'Health', 'date': '2023-12-29T17:09:23.503698', 'paymentMethod': 'Mobile Payment', 'location': 'Denver', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 58.91, 'category': 'Entertainment', 'date': '2024-07-16T13:53:23.503716', 'paymentMethod': 'Cash', 'location': 'New York', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 46.72, 'category': 'Entertainment', 'date': '2024-01-28T22:40:23.503734', 'paymentMethod': 'Mobile Payment', 'location': 'New York', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 82.05, 'category': 'Utilities', 'date': '2024-10-17T16:25:23.503752', 'paymentMethod': 'Mobile Payment', 'location': 'Miami', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 42.51, 'category': 'Food & Dining', 'date': '2024-05-18T21:37:23.503770', 'paymentMethod': 'Mobile Payment', 'location': 'San Francisco', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 85.23, 'category': 'Health', 'date': '2024-05-03T14:24:23.503787', 'paymentMethod': 'Cash', 'location': 'Orlando', 'subLocation': 'Tourist Spot', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 82.27, 'category': 'Transportation', 'date': '2024-07-11T22:42:23.503805', 'paymentMethod': 'Debit Card', 'location': 'Chicago', 'subLocation': 'Business District', 'currency': 'USD', 'recurring': False },
        { 'title': 'Purchase', 'amount': 39.75, 'category': 'Transportation', 'date': '2024-12-25T12:46:23.503823', 'paymentMethod': 'Cash', 'location': 'New York', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 38.72, 'category': 'Utilities', 'date': '2024-04-25T17:22:23.503839', 'paymentMethod': 'Cash', 'location': 'Online', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 30.16, 'category': 'Utilities', 'date': '2024-05-25T10:53:23.503856', 'paymentMethod': 'Mobile Payment', 'location': 'Online', 'subLocation': 'Park', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 63.91, 'category': 'Transportation', 'date': '2024-02-25T07:56:23.503874', 'paymentMethod': 'Debit Card', 'location': 'Houston', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 11.88, 'category': 'Health', 'date': '2024-08-20T07:33:23.503892', 'paymentMethod': 'Cash', 'location': 'Boston', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 77.22, 'category': 'Entertainment', 'date': '2024-09-17T15:22:23.503909', 'paymentMethod': 'Cash', 'location': 'Chicago', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 95.5, 'category': 'Health', 'date': '2024-03-13T04:50:23.503937', 'paymentMethod': 'Mobile Payment', 'location': 'Orlando', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': True },
        { 'title': 'Purchase', 'amount': 22.87, 'category': 'Shopping', 'date': '2024-08-27T06:48:23.503954', 'paymentMethod': 'Cash', 'location': 'Houston', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': False },
        { 'title': 'Ride', 'amount': 66.98, 'category': 'Food & Dining', 'date': '2024-06-03T06:03:23.503972', 'paymentMethod': 'Debit Card', 'location': 'Online', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': True },
        { 'title': 'Doctor Visit', 'amount': 53.26, 'category': 'Transportation', 'date': '2024-05-08T20:50:23.503989', 'paymentMethod': 'Credit Card', 'location': 'Online', 'subLocation': 'Harbor', 'currency': 'USD', 'recurring': False },
        { 'title': 'Ride', 'amount': 8.1, 'category': 'Transportation', 'date': '2024-11-20T07:50:23.504024', 'paymentMethod': 'Cash', 'location': 'Seattle', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': True },
        { 'title': 'Meal', 'amount': 36.53, 'category': 'Transportation', 'date': '2024-10-25T12:33:23.504042', 'paymentMethod': 'Cash', 'location': 'Orlando', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 12.76, 'category': 'Utilities', 'date': '2024-03-05T21:20:23.504060', 'paymentMethod': 'Mobile Payment', 'location': 'Houston', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 83.7, 'category': 'Health', 'date': '2024-11-16T21:24:23.504079', 'paymentMethod': 'Debit Card', 'location': 'Online', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': True },
        { 'title': 'Ride', 'amount': 46.17, 'category': 'Transportation', 'date': '2024-11-01T05:18:23.504096', 'paymentMethod': 'Debit Card', 'location': 'Miami', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 50.64, 'category': 'Utilities', 'date': '2024-11-29T06:21:23.504113', 'paymentMethod': 'Cash', 'location': 'New York', 'subLocation': 'Marketplace', 'currency': 'USD', 'recurring': False },
        { 'title': 'Doctor Visit', 'amount': 30.37, 'category': 'Health', 'date': '2024-07-17T13:25:23.504131', 'paymentMethod': 'Credit Card', 'location': 'Houston', 'subLocation': 'N/A', 'currency': 'USD', 'recurring': True },
        { 'title': 'Streaming Service', 'amount': 25.48, 'category': 'Shopping', 'date': '2024-10-30T15:47:23.504148', 'paymentMethod': 'Credit Card', 'location': 'Denver', 'subLocation': 'Mall', 'currency': 'USD', 'recurring': True },
        { 'title': 'Doctor Visit', 'amount': 97.88, 'category': 'Utilities', 'date': '2024-11-09T22:39:23.504166', 'paymentMethod': 'Mobile Payment', 'location': 'Los Angeles', 'subLocation': 'City Center', 'currency': 'USD', 'recurring': False },
        { 'title': 'Streaming Service', 'amount': 29.09, 'category': 'Transportation', 'date': '2024-07-11T15:04:23.504184', 'paymentMethod': 'Cash', 'location': 'Los Angeles', 'subLocation': 'Train Station', 'currency': 'USD', 'recurring': False },
        { 'title': 'Meal', 'amount': 5.44, 'category': 'Food & Dining', 'date': '2024-05-26T04:17:23.504201', 'paymentMethod': 'Debit Card', 'location': 'Houston', 'subLocation': 'Suburb', 'currency': 'USD', 'recurring': True },
    ];

    try {
        // Add a dynamic userId (replace with actual userId if needed)
        // const userId = "1b9269ab-8f50-467f-a740-65ef52a86108"; // Replace this as needed

        // Map each expense item and add the userId
        const { userId } = req.params;
        const getUser = await User.findOne({ userId });
        if (!getUser) {
            return res.status(404).send({ message: "User Not Found" })
        }
        const expenseItems = array.map(item => ({
            userId,
            ...item
        }));

        // Insert all expense items at once into the database
        const savedExpenseItems = await ExpenseItem.insertMany(expenseItems);

        // Return the saved records as a response
        res.status(201).json(savedExpenseItems);
    } catch (error) {
        // Handle any errors that occur during the insertion
        res.status(500).json({ message: 'Error saving expense items', error: error.message });
    }
};