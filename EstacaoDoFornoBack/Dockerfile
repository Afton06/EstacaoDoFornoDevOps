FROM node:lts AS builder

COPY . .

RUN npm install
RUN npm run build

<<<<<<< HEAD
=======
EXPOSE 3001

>>>>>>> c88325dd21f6fed9d219f9a6bb4fb1a13a0bccc5
CMD ["node", "dist/server.js"]

# docker build -t estacaodofornoback:v0.0.1 .
# docker run estacaodofornoback:v0.0.1