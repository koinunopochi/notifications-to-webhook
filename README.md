# notifications-to-webhook

Webhook通知を送信するCLIツールです。現在はSlackに対応しています。

## 使用方法

npxで直接実行できます。インストール不要です。

### 基本的な使用方法

```bash
# Slackに通知を送信
npx notifications-to-webhook -c slack -m "Hello, World!"

# 環境変数ファイルを指定して実行
npx notifications-to-webhook -e ./.env -c slack -m "テスト通知"
```

### オプション

- `-c, --client <client>`: クライアントタイプ（現在は`slack`のみ対応）
- `-m, --message <message>`: 送信するメッセージ
- `-e, --env <path>`: 環境変数ファイルのパス

### 環境変数

#### Slack

`.env`ファイルまたは環境変数に以下を設定してください：

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## 使用例

```bash
# 基本的な通知
npx notifications-to-webhook --client slack --message "デプロイが完了しました"

# 短縮オプション
npx notifications-to-webhook -c slack -m "ビルドエラーが発生しました"

# 環境変数ファイルを指定
npx notifications-to-webhook -e ./config/.env -c slack -m "処理完了"

# CIでの利用例
npx notifications-to-webhook -c slack -m "GitHub Actions: Deploy to production completed"
```
