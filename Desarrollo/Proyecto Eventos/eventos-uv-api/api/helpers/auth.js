"use strict";

const jwt = require("jsonwebtoken");

const sharedSecret = "mySecret";
const issuer = "dnieln7";

exports.verifyToken = function (req, authOrSecDef, token, callback) {

    let currentScopes = req.swagger.operation["x-security-scopes"];

    function sendError() {
        return req.res.status(403).json({message: "Error: Access Denied"});
    }

    if (token && token.indexOf("Bearer ") === 0) {
        const tokenString = token.split(" ")[1];

        jwt.verify(tokenString, sharedSecret, function (verificationError, decodedToken) {
            if (verificationError == null && Array.isArray(currentScopes) && decodedToken && decodedToken.role) {

                const roleMatch = currentScopes.indexOf(decodedToken.role) !== -1;
                const issuerMatch = decodedToken.iss === issuer;

                if (roleMatch && issuerMatch) {
                    req.auth = decodedToken;
                    return callback(null);
                } else {
                    return callback(sendError());
                }
            } else {
                return callback(sendError());
            }
        });
    } else {
        return callback(sendError());
    }
};

exports.issueToken = function (username, role) {
    return jwt.sign({
        sub: username,
        role: role,
        iss: issuer,
    }, sharedSecret,{});
};