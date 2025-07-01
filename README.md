# notifications-to-webhook

Webhook通知を送信するCLIツールです。現在はSlackに対応しています。

## インストール

```bash
npm install
```

## 使用方法

### 基本的な使用方法

```bash
# Slackに通知を送信
npx notifications-to-webhook -c slack -m "Hello, World!"

# 環境変数ファイルを指定して実行
npx dotenv -e ~/.config/.env npx notifications-to-webhook -c slack -m "テスト通知"
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
# 基本的な使用
npx notifications-to-webhook --client slack --message "デプロイが完了しました"

# 短縮形
npx notifications-to-webhook -c slack -m "ビルドエラーが発生しました"

# 環境変数ファイルを指定
npx dotenv -e ~/.config/project.env npx notifications-to-webhook -c slack -m "処理完了"
```

## 今後の対応予定

- Discord対応
- Teams対応
- カスタムwebhook対応