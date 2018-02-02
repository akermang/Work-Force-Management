import endpoints from '../../../server/endpoints.json';
import _endpoints from '../../../server/endpoints.js';

export class ApiService {
  getOptions(key) {
    return endpoints[key];
  }
}

