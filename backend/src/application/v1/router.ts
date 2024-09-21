import { Router } from 'express';
import { validateSchema } from './middlewares/ValidateSchema';
import CreateControllerFactory from '@infrastructure/factories/controller/CreateControllerFactory';
import multer from 'multer';
import RetrieveTransactionsControllerFactory from '@infrastructure/factories/controller/RetrieveTransactionsControllerFactory';

const upload = multer({ dest: 'uploads/' });
const router = Router();

(async () => {
  router.post('/transaction', upload.single('file'), CreateControllerFactory.make().execute);
  router.get(
    '/transaction',
    validateSchema('retrieveTransactionsSchema', 'query'),
    RetrieveTransactionsControllerFactory.make().execute,
  );
})();

export default router;
