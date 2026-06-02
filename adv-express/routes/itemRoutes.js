const express = require('express');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

const items = [
    { id : 1, name : 'item1', price : 100 },
    { id : 2, name : 'item2', price : 200 },
    { id : 3, name : 'item3', price : 300 },
];


router.get('/items',
    asyncHandler(async (req, res) => {
        res.json(items);
}));

module.exports = router;