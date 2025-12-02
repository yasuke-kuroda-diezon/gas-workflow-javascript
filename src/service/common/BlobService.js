/**
 * Blob関連のサービス。
 */
export class BlobService {
  static get() {
    return new BlobService();
  }

  getUtilities() {
    return Utilities; // Utilities is built-in class. see: https://developers.google.com/apps-script/reference/utilities/utilities
  }

  /**
   * Blob を生成する。
   * @param {string|Byte[]} data ファイル内容（文字列またはバイト配列）
   * @param {string} [contentType="application/octet-stream"] MIMEタイプ
   * @param {string} [name] ファイル名
   * @returns {GoogleAppsScript.Base.Blob}
   * @see https://developers.google.com/apps-script/reference/utilities/utilities#newblobdata
   */
  newBlob(data, contentType, name) {
    return this.getUtilities().newBlob(data, contentType, name);
  }

  /**
   * JSONからBlobを生成する（UTF-8）。
   */
  newBlobFromJson(obj, name) {
    const json = JSON.stringify(obj);
    return this.newBlob(json, "application/json; charset=utf-8", name);
  }
}
