# ===========================
# 1st stage: Build (dev image)
# ===========================
FROM dhi.io/node:24-debian12-dev AS build

# 作業ディレクトリ
WORKDIR /app

# 依存関係だけ先にコピー（キャッシュ効かせる用）
COPY package*.json ./

# 本番用依存関係のみインストール
RUN npm ci --only=production

# アプリ本体をコピー
COPY . .

# ===========================
# 2nd stage: Runtime (minimal image)
# ===========================
FROM dhi.io/node:24-debian12

# 実行時の作業ディレクトリ
WORKDIR /app

# build ステージから node_modules とアプリ本体を持ってくる
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/package*.json ./

# 実行環境
ENV NODE_ENV=production
ENV BASE_IMAGE="dhi.io/node:24-debian12 (runtime)"

# ポート公開
EXPOSE 3000

# アプリ起動コマンド
CMD ["node", "server.js"]