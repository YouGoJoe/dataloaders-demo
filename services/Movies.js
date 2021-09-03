const API = require("../APIs/MoviesAPI");

module.exports = () => {
  const findAll = async () => {
    const movies = await API.findAll();
    return movies;
  };

  const findById = async (id) => API.findById(id);

  const findByIds = async (ids) => API.findByIds(ids);

  return {
    findAll,
    findById,
    findByIds,
  };
};
