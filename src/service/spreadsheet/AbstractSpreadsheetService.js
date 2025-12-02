import { EnvKey, EnvService } from "src/service/common/EnvService";
import { EnvNotFoundError } from "src/service/common/error/EnvNotFoundError";
import { SpreadsheetNotFoundError } from "src/service/common/error/SpreadsheetNotFoundError";

/**
 * Spreadsheetサービスの抽象クラス.
 */
export class AbstractSpreadsheetService {
  /**
   * コンテナバインド型GAS: スプレッドシート上で動作するGAS.
   * スタンドアロン型GAS: 単体スクリプトとして動作するGAS.(※EnvKey.SPREAD_SHEET_ID で対象スプレッドシートのIDを指定する必要あり)
   * TODO: より良い判定方法がありそうで模索中...
   */
  isContainerBound() {
    try {
      const ui = SpreadsheetApp.getUi();
      return !!ui;
    } catch (error) {
      return false;
    }
  }

  /**
   * アクティブなスプレッドシートを取得する。
   * SpreadsheetApp is built-in class. see: https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app?hl=ja&_gl=1*hmkobh*_up*MQ..*_ga*MTA5NzE0OTU1NC4xNzY0NDM1ODM1*_ga_SM8HXJ53K2*czE3NjQ0MzU4MzUkbzEkZzAkdDE3NjQ0MzU4MzUkajYwJGwwJGgw
   */
  getActiveSpreadsheet() {
    if (this.isContainerBound()) {
      return SpreadsheetApp.getActiveSpreadsheet();
    }

    // スタンドアロン型プロジェクトの考慮. EnvからスプレッドシートIDを取得して開く.
    const spreadsheetId = EnvService.get(EnvKey.SPREAD_SHEET_ID);
    if (!spreadsheetId) {
      throw new EnvNotFoundError(EnvKey.SPREAD_SHEET_ID);
    }

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    if (!spreadsheet) {
      throw new SpreadsheetNotFoundError();
    }

    return spreadsheet;
  }

  /** スプレッドシートのUIメニューに項目を追加する。 */
  onOpen(menuName, entries) {
    if (this.isContainerBound()) {
      const ui = SpreadsheetApp.getUi();
      const menu = ui.createMenu(menuName);
      entries.forEach((menuAddItem) => {
        menu.addItem(menuAddItem.caption, menuAddItem.functionName);
      });
      menu.addToUi();
      return;
    }

    throw new Error(
      "現時点ではスタンドアロン型で onOpen の実行方法がわかりません... コンテナ型で実行して下さい。"
    );
  }
}
