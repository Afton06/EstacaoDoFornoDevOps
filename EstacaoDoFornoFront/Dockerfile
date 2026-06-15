FROM node:lts AS builder

<<<<<<< HEAD
COPY . .

RUN npm install
RUN npm run build

CMD ["node", "dist/server.js"]

# docker build -t estacaodofornofront:v0.0.1 .
# docker run estacaodofornofront:v0.0.1
=======
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t estacaodofornofront:v0.0.1 .
# docker run -p 80:80 estacaodofornofront:v0.0.1
>>>>>>> c88325dd21f6fed9d219f9a6bb4fb1a13a0bccc5
