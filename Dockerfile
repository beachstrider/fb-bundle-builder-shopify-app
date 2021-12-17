# Filename: Dockerfile
FROM public.ecr.aws/docker/library/node:lts-alpine

WORKDIR /usr/src/app

COPY . .
COPY package*.json ./

RUN node -v
RUN npm install
RUN npm run build

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "server"]
