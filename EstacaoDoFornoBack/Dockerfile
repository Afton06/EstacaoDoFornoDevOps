FROM node:lts AS builder

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]

# docker build -t estacaodofornoback:v0.0.1 .
# docker run estacaodofornoback:v0.0.1