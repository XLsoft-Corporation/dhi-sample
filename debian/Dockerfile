# 非DHI側（公平比較用）：Docker Official Image (DOI)
FROM node:24-bookworm-slim

# 作業ディレクトリ
WORKDIR /app

# 依存関係のみ先にコピーしてインストール
COPY package*.json ./

# production 依存のみインストール（CVE比較観点でも余計なものを入れない）
RUN npm ci --only=production

# アプリ本体
COPY . .

# 実行環境
ENV NODE_ENV=production
ENV BASE_IMAGE="node:24-bookworm-slim"

# ポート公開
EXPOSE 3000

# アプリ起動
CMD ["node", "server.js"]