FROM node:18-bullseye-slim AS build
WORKDIR /usr/src/phasmophobia_table
COPY . /usr/src/phasmophobia_table
RUN ./build.sh

FROM gcr.io/distroless/nodejs18-debian11:latest
COPY --from=build /usr/src/phasmophobia_table/backend /usr/src/phasmophobia_table_backend
WORKDIR /usr/src/phasmophobia_table_backend
EXPOSE 8089
CMD ["index.js"]
