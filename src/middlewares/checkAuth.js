import  verifyJWTToken  from "../utils/verifyJWToken";

export default (req, res, next) => {
    if (
        req.path === "/user/signin"
    ) {
        return next();
    }

    const token = req.headers.token;

    verifyJWTToken(token)
        .then((user) => {
            req.user = user.data._doc;
            next();
        })
        .catch(err => {
            res.status(403).json({ message: "Invalid auth token provided." });
        });
};