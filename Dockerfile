FROM node:15-alpine
WORKDIR /srv/app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
ENV NODE_ENV=production
ENV NODE_PATH=dist/
CMD ["node", "./dist/index.js"]