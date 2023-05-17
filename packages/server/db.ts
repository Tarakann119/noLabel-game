import * as path from 'path';
import { Sequelize, type SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, DB_HOST } = process.env;

export const initPostgreSQLConnection = async (): Promise<Sequelize | undefined> => {
  let sequelize;

  const sequelizeOptions: SequelizeOptions = {
    host: DB_HOST,
    port: POSTGRES_PORT ? Number(POSTGRES_PORT) : 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: 'postgres',
    logging: false,
  };

  /** Подключаемся к PostgreSQL */
  try {
    sequelize = new Sequelize(sequelizeOptions);
    console.log('✅  Подключение к PostgreSQL установлено');
  } catch (e) {
    console.error('❌  Не удалось подключиться к PostgreSQL');
    console.error(e);
  }

  try {
    /** Регистрируем все модели из папки models */
    const modelsPath = path.join(__dirname, './API/models');
    sequelize?.addModels([modelsPath]);

    /** Синхронизируем все модели */
    await sequelize?.sync({ alter: true });
    console.log('✅  Все модели синхронизированы');
  } catch (e) {
    console.error(
      '❌  Не удалось синхронизировать модели',
      DB_HOST,
      POSTGRES_USER,
      POSTGRES_PASSWORD
    );
    console.error(e);
  }

  return sequelize;
};
