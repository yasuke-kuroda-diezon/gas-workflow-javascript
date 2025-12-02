/**
 * シナリオケース: Slack通知の動作確認用Playground.
 */
import { SlackService } from "src/service/slack/SlackService";

export class SlackPlayground {
  slackPlayground() {
    const slackService = SlackService.get();

    slackService.sendText("hi there!");
    slackService.sendText("sent by JavaScript GAS workflow");
    slackService.notify("infoタイトル", "hello world");
    slackService.notifySuccess("成功タイトル", "成功しました");
    slackService.notifyFailure("失敗タイトル", "失敗しました");
  }

  static execute() {
    try {
      new SlackPlayground().slackPlayground();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
