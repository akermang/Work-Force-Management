import endpoints from '../../../server/endpoints.json';

export class ApiService {
  getOptions(key) {
    return endpoints[key];
  }
}
