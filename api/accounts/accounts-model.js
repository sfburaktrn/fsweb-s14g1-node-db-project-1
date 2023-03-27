//tamamlama için

/**
 * @param { import("knex").Knex } db
 * @returns { Promise<void> }
 */

const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const getByName = (name) => {
  return db("accounts").where("name", name).first();
};

const getByFilter = (filter) => {
  return db("accounts").where(filter);
};

const create = async (account) => {
  const id = await db("accounts").insert(account);
  return await getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return await getById(id);
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
  getByFilter,
};
