import { DefaultApi } from 'algorithms_api';

const api = new DefaultApi();
// eslint-disable-next-line import/no-mutable-exports
let host = 'http://localhost:3001';
// if the env is not production assume that the app has been started
// in dev mode and assume that the API is running locally
if (process.env.NODE_ENV === 'production') {
  host = 'https://ag-2021-api.herokuapp.com';
}

api.apiClient.basePath = host;

export { host, api };
