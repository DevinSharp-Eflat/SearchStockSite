import { DataTypes, Model, Sequelize } from 'sequelize';

export class Stock extends Model {}

export function StockModel(sequelize: Sequelize) {
  Stock.init(
    {
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeSeriesData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'stocks',
    }
  );

  return Stock;
}
