FROM node:15-alpine
WORKDIR /srv/app
COPY . .
RUN yarn install
EXPOSE 3000
ENV NODE_ENV=production
CMD ["yarn", "start"]