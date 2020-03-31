FROM node:latest

WORKDIR /home/cyberunk/app
COPY package*.json ./
RUN npm i

COPY . ./

CMD ["npm", "start"]
