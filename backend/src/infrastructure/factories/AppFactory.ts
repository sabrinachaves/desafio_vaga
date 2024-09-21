import { RequestHandler, Router, json } from 'express';
import App from '../../application/App';
import { AppConfig } from '../../config/AppConfig';

export default class AppFactory {
  static async make(routes: Router): Promise<App> {
    const middlewares: RequestHandler[] = [];

    middlewares.push(json());

    return new App({
      port: AppConfig.PORT,
      routes,
      middlewares,
      environment: AppConfig.APP_ENVIRONMENT,
    });
  }
}
