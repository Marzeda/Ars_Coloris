const Counter = require("../models/Counter");
const Product = require("../models/Product");

const getNextSequence = async (counterName) => {
    if (counterName === "product") {
        const productWithHighestId = await Product.findOne({
            legacyId: {
                $exists: true,
                $ne: null,
            },
        })
            .sort({
                legacyId: -1,
            })
            .select("legacyId")
            .lean();

        const highestProductId =
            productWithHighestId?.legacyId || 0;

        await Counter.findOneAndUpdate(
            {
                _id: counterName,
                $or: [
                    {
                        seq: {
                            $lt: highestProductId,
                        },
                    },
                    {
                        seq: {
                            $exists: false,
                        },
                    },
                ],
            },
            {
                $set: {
                    seq: highestProductId,
                },
            }
        );
    }

    const counter = await Counter.findByIdAndUpdate(
        counterName,
        {
            $inc: {
                seq: 1,
            },
        },
        {
            returnDocument: "after",
            upsert: true,
            setDefaultsOnInsert: true,
        }
    );

    return counter.seq;
};

module.exports = getNextSequence;