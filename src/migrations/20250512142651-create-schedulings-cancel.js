'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SchedulingCancels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      schedulingId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'Schedulings', key: 'id' },
        onDelete: 'CASCADE',
      },
      cancelledById: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      cancelledByType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cancelDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('SchedulingCancels');
  },
};
