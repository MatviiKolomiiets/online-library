const {verify, sign} = require("jsonwebtoken");

let jwtSecret = process.env.TOKEN_SECRET || "phieXohraiv5acou0aejuPei8poomouT"

async function verifyAccessToken(token) {
    return verify(token, jwtSecret);
}

function generateAccessToken(username) {
    return sign({email: username}, jwtSecret, {expiresIn: '7d'});
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}