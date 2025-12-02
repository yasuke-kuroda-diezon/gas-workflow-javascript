/**
 * HTTPクライアント.
 */
export class HttpClient {
  request(method, url, payload) {
    const options = {
      method,
      contentType: "application/json",
    };
    if (payload !== undefined) {
      options.payload = JSON.stringify(payload);
    }

    const httpResponse = UrlFetchApp.fetch(url, options); // UrlFetchApp is built-in class. see: https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app?hl=ja
    const contentText = httpResponse.getContentText();
    try {
      return JSON.parse(contentText);
    } catch (error) {
      return contentText;
    }
  }

  get(url) {
    return this.request("get", url);
  }

  post(url, payload = {}) {
    return this.request("post", url, payload);
  }
}
