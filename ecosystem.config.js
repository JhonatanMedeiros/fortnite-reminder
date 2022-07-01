module.exports = {
  apps: [
    {
      name: 'Fortnite Reminder',
      script: 'npm',
      args: 'run start',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      autorestart: false,
      watch: false,
      max_memory_restart: '1G'
    },
  ],
};
