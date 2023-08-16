import express from 'express';
const routes = express.Router();
import { createFamily,getFamily,deleteFamily} from '../controller/Families';

routes.route('/createFamily').post(createFamily);
routes.route('/getFamily').get(getFamily)
routes.route('/deleteFamily').delete(deleteFamily)
module.exports =routes;