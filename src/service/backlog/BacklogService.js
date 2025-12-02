import { AbstractBacklogService } from "src/service/backlog/AbstractBacklogService";
import { DateUtil } from "src/service/common/util/dateUtil";
import { ActivityType } from "src/service/backlog/ActivityType";
import { DEFAULT_PER_PAGE } from "src/service/common/Paginated";
/**
 * Backlog関連のサービス.
 */
export class BacklogService extends AbstractBacklogService {
  constructor() {
    super();
  }

  static get() {
    return new BacklogService();
  }

  /**
   * 認証ユーザー情報の取得
   * GET /api/v2/users/myself
   * see: https://developer.nulab.com/ja/docs/backlog/api/2/get-own-user/
   */
  getMyself() {
    const uri = this.buildUri("/api/v2/users/myself");
    const response = this.httpClient.get(uri);

    const { id, userId, name, mailAddress } = response;
    return { id, userId, name, mailAddress };
  }

  /**
   * 課題情報の取得
   * GET /api/v2/issues/:issueIdOrKey
   * see: https://developer.nulab.com/ja/docs/backlog/api/2/get-issue/
   */
  getIssue(issueIdOrKey) {
    const uri = this.buildUri(`/api/v2/issues/${issueIdOrKey}`);
    const response = this.httpClient.get(uri);

    const { issueKey, summary, assignee, dueDate } = response;
    const jstDueDate = dueDate ? DateUtil.formatToJstDate(dueDate) : "";

    return {
      issueKey,
      summary,
      assignee: assignee
        ? { userId: assignee.userId, name: assignee.name }
        : { userId: "", name: "未設定" },
      dueDate: jstDueDate,
    };
  }

  /**
   * アクティビティの取得
   * GET /api/v2/users/:userId/activities
   * see: https://developer.nulab.com/ja/docs/backlog/api/2/get-user-recent-updates/
   */
  getUserActivities(userId) {
    const activityType = ActivityType.get();
    const query = {
      count: DEFAULT_PER_PAGE,
      "activityTypeId[]": [
        activityType.ADD_ISSUE.id,
        activityType.UPDATE_ISSUE.id,
        activityType.COMMENT_ISSUE.id,
        activityType.DELETE_ISSUE.id,
        activityType.ADD_WIKI.id,
        activityType.UPDATE_WIKI.id,
        activityType.DELETE_WIKI.id,
        activityType.ADD_FILE.id,
        activityType.UPDATE_FILE.id,
        activityType.DELETE_FILE.id,
        activityType.SVN_COMMIT.id,
        activityType.GIT_PUSH.id,
        activityType.CREATE_GIT_REPO.id,
        activityType.BULK_UPDATE_ISSUE.id,
        activityType.JOIN_PROJECT.id,
        activityType.LEAVE_PROJECT.id,
        activityType.ADD_COMMENT_NOTIFICATION.id,
      ],
    };
    const uri = this.buildUri(`/api/v2/users/${userId}/activities`, query);
    const response = this.httpClient.get(uri);

    const result = response.map((activity) => {
      return {
        project: {
          projectKey: activity.project.projectKey,
        },
        type: ActivityType.getDescriptionById(activity.type),
        ...(activity.content.id && {
          content: {
            key_id: activity.content.key_id,
            summary: activity.content.summary,
          },
        }),
        ...(activity.content.key_id && {
          issueKey: `${activity.project.projectKey}-${activity.content.key_id}`,
        }),
      };
    });

    return result;
  }
}
