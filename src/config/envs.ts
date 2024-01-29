
import 'dotenv/config';
import {get} from 'env-var';

export const envs = {


    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PORT').default('public').asString(),


}


