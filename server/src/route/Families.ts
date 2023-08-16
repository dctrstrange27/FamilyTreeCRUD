import express from 'express';
const routes = express.Router();
import { createFamily,getFamily,deleteFamily, updateFamily} from '../controller/Families';

routes.route('/createFamily').post(createFamily);
routes.route('/getFamily').get(getFamily)
routes.route('/deleteFamily').delete(deleteFamily)
routes.route('/updateFamily').delete(updateFamily)
module.exports =routes;