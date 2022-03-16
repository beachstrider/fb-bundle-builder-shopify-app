# Filename: Dockerfile
FROM public.ecr.aws/docker/library/node:lts-alpine

WORKDIR /usr/src/app

COPY . .
COPY package*.json ./

ARG logo=""
ENV LOGO_URL=$logo
ARG appurl
ENV PROXY_APP_URL=$appurl
ARG title="Bundle Builder"
ENV PAGE_TITLE=$title
ARG storagekey
ENV LOCAL_STORAGE_KEY=$storagekey
ARG apiurl
ENV BUNDLE_API_URL=$apiurl

RUN node -v
RUN npm install

RUN curl -sL https://sentry.io/get-cli/ | bash

ENV SENTRY_ORG="sunrise-integration"
ENV SENTRY_PROJECT="bundle-builder-proxy"
RUN export SENTRY_RELEASE=$(sentry-cli releases propose-version)
RUN echo SENTRY_PROJECT=$SENTRY_PROJECT
RUN echo SENTRY_RELEASE=$SENTRY_RELEASE

RUN sentry-cli releases new -p $SENTRY_PROJECT $SENTRY_RELEASE
RUN sentry-cli releases set-commits --auto $SENTRY_RELEASE
RUN sentry-cli releases finalize $SENTRY_RELEASE

RUN npm run build

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "server"]
