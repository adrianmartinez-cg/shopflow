import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public hashedPassword!: string;
  public role!: 'user' | 'admin';
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'hashed_password'
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);
