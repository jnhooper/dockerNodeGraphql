import Sequelize from 'sequelize';

const sqlize: any = Sequelize;
const sequelize: any = new sqlize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: 'dockerNodeGraphql_postgres',
  }
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import(
    './message'
  ),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
