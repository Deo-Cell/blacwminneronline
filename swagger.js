const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation de mon API',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Mettez ici l'URL de votre serveur
        description: 'Serveur local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Mettez ici le chemin vers vos fichiers de routes
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};