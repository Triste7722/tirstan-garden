#!/bin/bash
set -e

# 服务器连接信息（按需修改）
SERVER="root@43.110.23.50"
REMOTE_TMP="/tmp/blog_deploy"
NGINX_CONF_PATH="/etc/nginx/conf.d/myblog.conf"

echo "🚀 开始打包项目..."
pnpm build

echo "📦 打包成功，准备上传到服务器..."
ssh "$SERVER" "mkdir -p $REMOTE_TMP"

# 上传构建产物到临时目录
scp -r dist/* "$SERVER:$REMOTE_TMP/"

# 单独上传 Nginx 配置（避免被误拷进网站根目录）
scp nginx.conf "$SERVER:/tmp/blog_nginx.conf"

echo "🔄 文件上传完毕，正在服务器上更新网站目录与 Nginx 配置..."
ssh "$SERVER" << 'EOF'
  set -e

  # 覆盖网站目录
  cp -rf /tmp/blog_deploy/* /usr/share/nginx/html/
  rm -rf /tmp/blog_deploy/*

  # 写入 SPA 回退配置（try_files），修复 history 路由刷新 404
  cp -f /tmp/blog_nginx.conf /etc/nginx/conf.d/myblog.conf
  rm -f /tmp/blog_nginx.conf

  # 校验并重载 Nginx
  nginx -t
  nginx -s reload

  echo "✅ 服务器端更新完成！"
EOF

echo "🎉 部署成功！请刷新浏览器查看你的博客：http://tirster.xin"
