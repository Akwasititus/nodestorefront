FROM node:12

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

# COPY package.json /app/package.json
# COPY package-lock.json /app/package-lock.json

COPY package.json ./
RUN npm install

COPY . .

RUN npm install -g pm2

EXPOSE 5000

CMD ["pm2-runtime", "server.js"]