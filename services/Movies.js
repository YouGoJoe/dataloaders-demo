const API = require("../APIs/MoviesAPI");

module.exports = () => {
  const findAll = async () => API.findAll();

  const findByName = async (name) => {
    console.log(`fetching data for movie: ${name.toLowerCase()}`);
    return API.findByName(name);
  };

  return {
    findAll,
    findByName,
  };
};
