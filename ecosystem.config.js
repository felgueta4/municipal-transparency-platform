module.exports = {
  apps: [
    {
      name: 'municipal-backend',
      cwd: '/home/ubuntu/municipal_transparency_platform/apps/api',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    },
    {
      name: 'municipal-frontend',
      cwd: '/home/ubuntu/municipal_transparency_platform/frontend/nextjs_space',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      }
    }
  ]
};
