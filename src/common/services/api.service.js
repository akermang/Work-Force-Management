import endpoints from '../../../server/endpoints.json';

export class ApiService {
  getOptions(key) {
    let endpoint = endpoints[key];    
    let headers = new Headers();    
    headers.append("Content-Type", endpoint.contentType);
    endpoint.params.headers = headers;
    return endpoint;
  }
}
