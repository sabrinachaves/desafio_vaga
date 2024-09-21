import DatabaseFactory from '@infrastructure/factories/persistence/DatabaseFactory';
import routes from './application/routes';
import AppFactory from './infrastructure/factories/AppFactory';

(async () => {
  const database = await DatabaseFactory.make();
  await database.connect();

  const app = await AppFactory.make(routes);
  await app.listen();
})();
