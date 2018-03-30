let axios = require('axios');

class BaseClient {
  constructor(apiKey, baseUrl) {
    if (!apiKey) {
      throw new Error('API Key not provided.');
    }

    this._apiKey = apiKey;

    this._httpManager = axios.create({
      baseURL: baseUrl
    });
  }

  get authParam() {
    throw new Error('Not implemented');
  }

  get httpManager() {
    return this._httpManager;
  }

  get requestKeyMap () {
    throw new Error('Not implemented');
  }

  /**
   * Get a movie by looking up using different params (e.g. title, imdb id, year etc.)
   * @param options
   */
  get(options) {
    throw new Error('Not implemented');
  }

  /**
   * Search for a movie.
   * @param options
   */
  search(options) {
    throw new Error('Not implemented');
  }

  _makeHTTPGET(url, params, headers, responseTransformer) {
    let paramsWithAuth = Object.assign({}, params);
    paramsWithAuth[this.authParam] = this._apiKey;

    return this.httpManager({
      method: 'get',
      url: url,
      params: paramsWithAuth,
      headers: headers,
      transformResponse: [JSON.parse, responseTransformer]
    });
  }

  _translateIncomingRequestOptions(options) {
    let translated = {};
    Object.keys(options).forEach((key) => {
      if (options[key] && this.requestKeyMap[key]) {
        translated[this.requestKeyMap[key]] = options[key];
      }
    });
    return translated;
  }
}

module.exports = BaseClient;
