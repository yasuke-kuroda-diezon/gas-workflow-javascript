/**
 * Gmail関連のサービス.
 */
export class GmailService {
  static get() {
    return new GmailService();
  }

  getGmailApp() {
    return GmailApp; // GmailApp is built-in class. see: https://developers.google.com/apps-script/reference/gmail/gmail-app?hl=ja
  }

  /**
   * メールを送信する.
   * @param {string} recipient 宛先メールアドレス
   * @param {string} subject 件名
   * @param {string} body 本文
   * @param {Object} [options] 追加オプション（cc、bcc、name、replyTo、htmlBody など）
   */
  sendEmail(recipient, subject, body, options = {}) {
    this.getGmailApp().sendEmail(recipient, subject, body, options);
  }

  /**
   * 未読メール件数を集計する.
   * @returns {number}
   */
  getUnreadMessageCount() {
    const query = "is:unread";
    const gmailThreads = this.getGmailApp().search(query);
    const total = gmailThreads.reduce(
      (sum, gmailThread) => sum + gmailThread.getMessageCount(),
      0
    );
    return total;
  }
}
