FROM node:latest 
WORKDIR /app 
COPY . /app
RUN npm install --frozen-lockfile
RUN yarn install 
CMD yarn start --host 0.0.0.0 --port 3000 
EXPOSE 3000
