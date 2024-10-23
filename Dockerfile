FROM node:18.20.3
LABEL Alan Eicker
WORKDIR /src
COPY package.json . /src/
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
