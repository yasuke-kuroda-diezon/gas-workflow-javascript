import { EnvKey, EnvService } from "src/service/common/EnvService";
import { HttpClient } from "src/service/common/HttpClient";
import { EnvNotFoundError } from "src/service/common/error/EnvNotFoundError";
/**
 * Slack関連のサービス.
 */
export class SlackService {
  constructor(webhookUrl) {
    if (!webhookUrl || webhookUrl === "null") {
      throw new EnvNotFoundError(EnvKey.SLACK_WEBHOOK_URL);
    }
    this.webhookUrl = webhookUrl;
    this.httpClient = new HttpClient();

    this.DEFAULT_COLOR = "#4d91f7";
    this.SUCCESS_COLOR = "#00c100";
    this.FAILURE_COLOR = "#ff0909";
  }

  static get() {
    const webhookUrl = EnvService.get("SLACK_WEBHOOK_URL");
    return new SlackService(webhookUrl);
  }

  /**
   * 文字列を送信する.
   */
  sendText(text) {
    return this.httpClient.post(this.webhookUrl, { text });
  }

  /**
   * attachments付きメッセージを送信する.
   */
  sendAttachment(color, title, value) {
    const payload = {
      attachments: [
        {
          color,
          fields: [
            {
              title: title ?? "title",
              value: value ?? "value",
            },
          ],
        },
      ],
    };
    return this.httpClient.post(this.webhookUrl, payload);
  }

  notify(title, value) {
    return this.sendAttachment(this.DEFAULT_COLOR, title, value);
  }

  notifySuccess(title, value) {
    return this.sendAttachment(this.SUCCESS_COLOR, title, value);
  }

  notifyFailure(title, value) {
    return this.sendAttachment(this.FAILURE_COLOR, title, value);
  }
}
