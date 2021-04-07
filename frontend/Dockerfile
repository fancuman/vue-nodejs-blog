FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY . .

# build app
CMD ["npm", "run", "build"]
# start app
# CMD ["npm", "run", "serve"]