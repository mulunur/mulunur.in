module.exports = {
  apps: [
    {
      name: 'mulunur-website',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HTTPS_PORT: 3443,
        CERT_PATH: '/etc/letsencrypt/live/mulunur.in/fullchain.pem',
        KEY_PATH: '/etc/letsencrypt/live/mulunur.in/privkey.pem'
      },
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
