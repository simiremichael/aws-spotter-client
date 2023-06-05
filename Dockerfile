FROM node:18

# Create app directory
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start"]
