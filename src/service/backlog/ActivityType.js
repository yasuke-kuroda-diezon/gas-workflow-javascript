/**
 * Backlog アクティビティ種別
 */
export class ActivityType {
  static get() {
    return {
      ADD_ISSUE: { id: 1, description: "課題の追加" },
      UPDATE_ISSUE: { id: 2, description: "課題の更新" },
      COMMENT_ISSUE: { id: 3, description: "課題にコメント" },
      DELETE_ISSUE: { id: 4, description: "課題の削除" },
      ADD_WIKI: { id: 5, description: "Wikiを追加" },
      UPDATE_WIKI: { id: 6, description: "Wikiを更新" },
      DELETE_WIKI: { id: 7, description: "Wikiを削除" },
      ADD_FILE: { id: 8, description: "共有ファイルを追加" },
      UPDATE_FILE: { id: 9, description: "共有ファイルを更新" },
      DELETE_FILE: { id: 10, description: "共有ファイルを削除" },
      SVN_COMMIT: { id: 11, description: "Subversionコミット" },
      GIT_PUSH: { id: 12, description: "GITプッシュ" },
      CREATE_GIT_REPO: { id: 13, description: "GITリポジトリ作成" },
      BULK_UPDATE_ISSUE: { id: 14, description: "課題をまとめて更新" },
      JOIN_PROJECT: { id: 15, description: "プロジェクトに参加" },
      LEAVE_PROJECT: { id: 16, description: "プロジェクトから脱退" },
      ADD_COMMENT_NOTIFICATION: {
        id: 17,
        description: "コメントにお知らせを追加",
      },
      ADD_PULL_REQUEST: { id: 18, description: "プルリクエストの追加" },
      UPDATE_PULL_REQUEST: { id: 19, description: "プルリクエストの更新" },
      COMMENT_PULL_REQUEST: { id: 20, description: "プルリクエストにコメント" },
      DELETE_PULL_REQUEST: { id: 21, description: "プルリクエストの削除" },
      ADD_MILESTONE: { id: 22, description: "マイルストーンの追加" },
      UPDATE_MILESTONE: { id: 23, description: "マイルストーンの更新" },
      DELETE_MILESTONE: { id: 24, description: "マイルストーンの削除" },
      GROUP_JOIN_PROJECT: {
        id: 25,
        description: "グループがプロジェクトに参加",
      },
      GROUP_LEAVE_PROJECT: {
        id: 26,
        description: "グループがプロジェクトから脱退",
      },
    };
  }

  /**
   * id から description を取得します。
   */
  static getDescriptionById(id) {
    const found = Object.values(this.get()).find((t) => t.id === id);
    return found ? found.description : null;
  }
}
