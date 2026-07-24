const Counter = require("../models/Counter");

const getNextSequence = async (counterName) => {
    const counter = await Counter.findByIdAndUpdate(
        counterName,
        {
            $inc: {
                seq: 1
            }
        },
        {
            returnDocument: "after",
            upsert: true,
            setDefaultsOnInsert: true
        }
    );

    return counter.seq;
};

module.exports = getNextSequence;