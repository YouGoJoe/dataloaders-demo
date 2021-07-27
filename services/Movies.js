const API = require("../APIs/MoviesAPI");

module.exports = () => {
  const findAll = async () => {
    console.log("fetching data for all movies");
    return API.findAll();
  };

  const findByName = async (name) => {
    console.log(`fetching data for movie: ${name.toLowerCase()}`);
    return API.findByName(name);
  };

  return {
    findAll,
    findByName,
  };
};
