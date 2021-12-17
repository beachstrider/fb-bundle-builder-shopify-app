# Filename: Dockerfile
FROM public.ecr.aws/docker/library/node:lts-alpine

WORKDIR /usr/src/app

COPY . .
COPY package*.json ./

ARG logo=""
ENV LOGO_URL=$logo
ARG appurl
ENV PROXY_APP_URL=$appurl
ARG title=""
ENV PAGE_TITLE=$title
ARG storagekey
ENV LOCAL_STORAGE_KEY=$storagekey
ARG apiurl
ENV BUNDLE_API_URL=$apiurl

RUN node -v
RUN npm install
RUN npm run build

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "server"]
