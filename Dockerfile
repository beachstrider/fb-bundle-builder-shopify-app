# Filename: Dockerfile
FROM public.ecr.aws/docker/library/node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN node -v
RUN npm install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["npm", "run", "server"]