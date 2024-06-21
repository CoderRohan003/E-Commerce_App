import JWT from "jsonwebtoken";

// Proctected Routes token base
const requireSignIn = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
};

export {requireSignIn};