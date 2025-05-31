FROM node:20-alpine AS build

RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --unsafe-perm && \ 
    pnpm approve-builds 

COPY . .

RUN chown -R appuser:appgroup /usr/src/app

USER appuser
RUN pnpm run build


# stage 2: production
FROM node:20-alpine AS prod

RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json

RUN chown -R appuser:appgroup /usr/src/app

USER appuser

ENV NODE_ENV=production  
ARG VERSION=1.0.0
RUN echo "Building version $VERSION"

EXPOSE 8080

CMD ["node", "./dist/index.js"]

