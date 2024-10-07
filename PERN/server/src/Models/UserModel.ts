import { DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {}

export function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //email: {
       // type: DataTypes.STRING,
      //  allowNull: true,
      //  unique: true,
      //  validate: {
      //    isEmail: true,
       // },
     // },
    //  firstname: {
    //    type: DataTypes.STRING,
     //   allowNull: true,
     // },
     // lastname: {
     //   type: DataTypes.STRING,
     //   allowNull: true,
     // },
    }, {
    
      tableName: 'users',
      sequelize,
    });


  return User
  }