FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# もしnpmパッケージを使う場合
# RUN npm install

COPY . .

# シンプルに静的サーバーを使う場合（http-server）
RUN npm install -g http-server

CMD ["http-server", "-p", "5173"]

