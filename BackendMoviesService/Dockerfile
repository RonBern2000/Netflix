FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 4002

CMD ["npm", "run", "dev"]