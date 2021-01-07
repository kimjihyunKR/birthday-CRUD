const Sequelize = require('sequelize');
var moment = require('moment');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },
      pw: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get: function() {
          return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD   hh:mm:ss');
        }
      },
    }, {
      sequelize,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false,
      underscored: false,
      modelName: 'Letter',
      tableName: 'letters',
      paranoid: false,
    });
  }

  // static associate(db) {
  //   db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  // }
};
