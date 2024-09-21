import * as http from 'http';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import { AppConfig } from '@config/AppConfig';

interface AppOptions {
  port: number;
  routes: express.Router;
  middlewares?: RequestHandler[];
  environment: string;
}

export default class App {
  app: express.Express;
  port: number;
  routes: express.Router;
  middlewares: RequestHandler[];
  environment: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.routes = options.routes;
    this.middlewares = options.middlewares || [];
    this.environment = options.environment || '';

    this.handlerMiddlewares();
    this.handlerRoutes();
  }

  private handlerRoutes(): void {
    this.app.use(this.routes);
  }

  private handlerMiddlewares(): void {
    this.app.use(
      cors({
        origin: AppConfig.BASE_URL_FRONT,
        methods: ['GET', 'POST'],
        credentials: true,
      }),
    );

    this.middlewares.forEach((value) => this.app.use(value));
  }

  async listen(): Promise<http.Server> {
    return this.app.listen(this.port, () => {
      console.log(`Application "transaction" is running. Listening on http://localhost:${this.port}`);
      console.log('Press CTRL+C to exit');
    });
  }
}
