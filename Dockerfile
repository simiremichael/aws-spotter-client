FROM node:18.13.0 

# Create app directory
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .


EXPOSE 3000

CMD [ "npm", "start"]
