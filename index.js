#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

program
  .version('1.0.0')
  .description('Send notifications to webhook services')
  .option('-c, --client <client>', 'Client type (slack)', 'slack')
  .option('-m, --message <message>', 'Message to send', 'Hello from notifications-to-webhook!')
  .option('-e, --env <path>', 'Path to .env file')
  .parse();

const options = program.opts();

async function sendSlackNotification(message, webhookUrl) {
  try {
    const payload = {
      text: message
    };

    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Slack notification sent successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to send Slack notification:', error.message);
    process.exit(1);
  }
}

async function main() {
  // Load environment variables from specified file
  if (options.env) {
    const envPath = path.resolve(options.env);
    dotenv.config({ path: envPath });
    console.log(`📁 Loading environment from: ${envPath}`);
  }

  const { client, message } = options;

  switch (client.toLowerCase()) {
    case 'slack':
      const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (!slackWebhookUrl) {
        console.error('❌ SLACK_WEBHOOK_URL environment variable is required for Slack notifications');
        console.log('💡 Set SLACK_WEBHOOK_URL in your environment or .env file');
        process.exit(1);
      }
      await sendSlackNotification(message, slackWebhookUrl);
      break;
    
    default:
      console.error(`❌ Unsupported client: ${client}`);
      console.log('💡 Currently supported clients: slack');
      process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});