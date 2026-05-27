FROM node:lts AS builder

COPY . .

RUN npm install
RUN npm run build

CMD ["node", "dist/server.js"]

# docker build -t estacaodofornofront:v0.0.1 .
# docker run estacaodofornofront:v0.0.1