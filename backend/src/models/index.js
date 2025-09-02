// src/models/index.js
import fs from 'fs/promises';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '..', '..', 'config', 'config.cjs');
const configModule = await import(pathToFileURL(configPath));
const config = configModule.default[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = await fs.readdir(__dirname);

for (const file of files) {
  if (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.ts' &&
    file.slice(-5) !== '.d.ts'
  ) {
    const modelModule = await import(pathToFileURL(path.join(__dirname, file)));
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    console.log(`Associating model: ${modelName}`);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;