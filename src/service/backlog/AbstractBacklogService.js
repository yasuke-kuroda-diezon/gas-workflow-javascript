import { EnvKey, EnvService } from "src/service/common/EnvService";
import { HttpClient } from "src/service/common/HttpClient";
import { EnvNotFoundError } from "src/service/common/error/EnvNotFoundError";
/**
 * Backlogサービスの抽象クラス.
 */
export class AbstractBacklogService {
  /**
   * @param {string} backlogDomain
   * @param {string} backlogApiKey
   * @param {HttpClient} httpClient
   */
  constructor() {
    const backlogDomain = EnvService.get(EnvKey.BACKLOG_DOMAIN);
    const backlogApiKey = EnvService.get(EnvKey.BACKLOG_API_KEY);
    if (!backlogDomain || backlogDomain === "null") {
      throw new EnvNotFoundError(BACKLOG_DOMAIN);
    }
    if (!backlogApiKey || backlogApiKey === "null") {
      throw new EnvNotFoundError(BACKLOG_API_KEY);
    }
    this.backlogDomain = backlogDomain;
    this.backlogApiKey = backlogApiKey;
    this.httpClient = new HttpClient();
  }

  /**
   * URI を構築する
   * @param {string} path 例: '/api/v2/users/myself'
   * @param {Object} [query] 追加クエリ。{ foo: 'bar' }
   * @returns {string}
   */
  buildUri(path, query = {}) {
    const baseUrl = `${this.backlogDomain}${path}`;
    const mergedParams = {
      ...query,
      apiKey: this.backlogApiKey,
    };
    const queryString = Object.keys(mergedParams)
      .map((paramKey) => {
        const value = mergedParams[paramKey];
        const encodedKey = encodeURIComponent(paramKey);
        if (Array.isArray(value)) {
          return value
            .map((v) => `${encodedKey}=${encodeURIComponent(v)}`)
            .join("&");
        }
        return `${encodedKey}=${encodeURIComponent(value)}`;
      })
      .join("&");

    return `${baseUrl}?${queryString}`;
  }
}
