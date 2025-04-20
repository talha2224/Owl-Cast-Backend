const { AccountModel } = require("../models/account.model");
const { PaymentModel } = require("../models/payment.model");

const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
        const date = new Date(item.createdAt);
        const monthName = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb, Mar...

        if (!acc[monthName]) {
            acc[monthName] = [];
        }
        acc[monthName].push(item);
        return acc;
    }, {});
};

const getData = async (req, res) => {
    try {
        let { date } = req.params;

        if (!date) {
            return res.status(400).json({ error: "Date parameter (YYYY-MM) is required" });
        }

        let users = await AccountModel.find({
            createdAt: {
                $gte: new Date(`${date}-01T00:00:00.000Z`),
                $lt: new Date(`${date}-31T23:59:59.999Z`)
            }
        });

        let payments = await PaymentModel.find({
            createdAt: {
                $gte: new Date(`${date}-01T00:00:00.000Z`),
                $lt: new Date(`${date}-31T23:59:59.999Z`)
            }
        }).populate("userId");

        let totalUsers = await AccountModel.find({});
        let totalPayments = await PaymentModel.find({});
        let groupedUsers = groupByMonth(totalUsers);
        let groupedPayments = groupByMonth(totalPayments);

        return res.json({
            date,
            data: {
                monthWiseUsers: users,
                monthWisePayment: payments,
                monthWiseActiveUsers: users,
                totalUsers,
                totalPayments,
                groupedUsers,
                groupedPayments
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getData };
