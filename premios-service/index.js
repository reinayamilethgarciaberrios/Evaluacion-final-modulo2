const server = require("./src/app"); // Importamos el servidor desde el archivo app.js
const sequelize = require('./data/db.js');
sequelize.sync({force: false}).then(() => console.log('Conexcion exitosa'));
server.listen(process.env.PORT || 4000, () => {
  // Iniciamos el servidor en el puerto especificado en la variable de entorno PORT
  console.log(`Premios Service working in port: ${process.env.PORT || 4000}`); // Imprimimos un mensaje en la consola indicando que el servidor se ha iniciado correctamente
});
