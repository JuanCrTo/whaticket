import { QueryInterface } from "sequelize";

const { Sequelize } = require("sequelize");
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Obtener todos los tenants existentes
    const tenants = await queryInterface.sequelize.query(
      'SELECT id FROM "Tenants"',
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (!tenants.length)
      throw new Error(
        "No tenants found. Create at least one tenant before seeding settings."
      );

    // Para cada tenant, insertar el setting
    const now = new Date();
    const settings = tenants.map((tenant: any) => ({
      key: "userCreation",
      value: "enabled",
      tenantId: tenant.id,
      createdAt: now,
      updatedAt: now
    }));
    return queryInterface.bulkInsert("Settings", settings, {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Settings", {});
  }
};
