import devEnv from './env.dev';
import prodEnv from './env';

const env = import.meta.env.DEV ? devEnv : prodEnv;

export default env;
