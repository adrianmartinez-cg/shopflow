import { DataTypes, Model, Sequelize, type ModelStatic } from "sequelize";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcrypt";

// Public atributes shadow sequelize getters and setters
export class User extends Model {
  public hashedPassword!: string;
  public role!: "user" | "admin";

  public static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.hasMany(models.ProductReview!, {
      foreignKey: "userId",
      as: "reviews",
    });
  }

  public async validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.hashedPassword);
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  User.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: () => uuidv7(),
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      hashedPassword: {
        type: dataTypes.STRING(255),
        allowNull: false,
        field: "hashed_password",
      },
      role: {
        type: dataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: dataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      hooks: {
        beforeCreate: async (user: User) => {
          const salt = await bcrypt.genSalt(10);
          user.hashedPassword = await bcrypt.hash(user.hashedPassword, salt);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed("hashedPassword")) {
            const salt = await bcrypt.genSalt(10);
            user.hashedPassword = await bcrypt.hash(user.hashedPassword, salt);
          }
        },
      },
    },
  );

  return User;
};
