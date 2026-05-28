FROM node:lts AS builder

WORKDIR /the/workdir/path

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]

# docker build -t estacaodofornofront:v0.0.1 .
# docker run estacaodofornofront:v0.0.1