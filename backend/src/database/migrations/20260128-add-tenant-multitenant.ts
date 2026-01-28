import { QueryInterface, DataTypes, Sequelize as SeqType } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof SeqType) => {
    // 1. Crear tabla Tenants
    await queryInterface.createTable("Tenants", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      displayName: { type: DataTypes.STRING, allowNull: false },
      logo: { type: DataTypes.STRING },
      domain: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING, defaultValue: "active" },
      plan: { type: DataTypes.STRING, defaultValue: "free" },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });

    // 2. Agregar tenantId a todas las tablas
    const tables = [
      "Users",
      "Queues",
      "Whatsapps",
      "Contacts",
      "Tickets",
      "Messages",
      "QuickAnswers",
      "Settings",
      "ContactCustomFields"
    ];
    for (const table of tables) {
      await queryInterface.addColumn(table, "tenantId", {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Tenants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    // 1. Quitar tenantId de todas las tablas
    const tables = [
      "Users",
      "Queues",
      "Whatsapps",
      "Contacts",
      "Tickets",
      "Messages",
      "QuickAnswers",
      "Settings",
      "ContactCustomFields"
    ];
    for (const table of tables) {
      await queryInterface.removeColumn(table, "tenantId");
    }
    // 2. Eliminar tabla Tenants
    await queryInterface.dropTable("Tenants");
  }
};
