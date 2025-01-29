const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Car Management API",
            version: "1.0.0",
            description: "API for managing cars with user authentication",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);
    
module.exports = swaggerDocument;