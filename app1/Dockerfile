FROM node:18-alpine
WORKDIR /app1
COPY package.json ./
RUN npm install
RUN npx prisma generate
RUN npm i -g nodemon
CMD ["nodemon", "index.js"]
