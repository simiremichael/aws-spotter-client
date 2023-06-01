FROM nginx:latest

# Create app directory
WORKDIR /app

COPY . .

RUN npm install

ENV REACT_APP_SERVER_URL="http://localhost:5000/api"
ENV REACT_APP_GOOFLE_OAUTH="771408852902-tgtge00svjkijjre2e3279b2pt7r2nfa.apps.googleusercontent.com"
ENV REACT_APP_CLOUD_PRESET="upload_preset"
ENV REACT_APP_CLOUD_KEY="do2u3zzko"
ENV REACT_APP_MAPBOX_TOKEN="pk.eyJ1Ijoic2ltaXJlbWljaGFlbCIsImEiOiJjbDhtMWZza3owOGM5M290aGdkdXNzbnhyIn0.cZ53EbJgw_QlQEq2-bRpWw"

EXPOSE 3000

# CMD [ "npm", "start"]
