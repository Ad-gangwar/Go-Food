const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');

// Include the JSON parsing middleware
router.use(express.json());

router.post('/orderData', async (req, res) => {

    let data = req.body.order_data;
    data.splice(0, 0, { order_date: req.body.order_date });

    try {
        let eId = await Orders.findOne({ 'email': req.body.email });

        if (eId === null) {
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await Orders.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`);
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Orders.findOne({'email': req.body.email});
        res.json({ orderData: myData });
    } catch (error) {
        res.status(500).send("Server error: " + error.message);
    }
});

module.exports = router;