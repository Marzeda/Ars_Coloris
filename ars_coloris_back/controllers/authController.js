const asyncHandler = require(
    "../middleware/asyncHandler"
);

const authService = require(
    "../services/authService"
);

const loginUser = asyncHandler(
    async (req, res) => {
        const result =
            await authService.login(
                req.body
            );

        return res.json(result);
    }
);

const forgotPassword = asyncHandler(
    async (req, res) => {
        const result =
            await authService.forgotPassword(
                req.body
            );

        return res.json(result);
    }
);

const resetPassword = asyncHandler(
    async (req, res) => {
        const result =
            await authService.resetPassword(
                req.body
            );

        return res.json(result);
    }
);

module.exports = {
    loginUser,
    forgotPassword,
    resetPassword
};