# Step 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Step 2: Serve
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build app/dist ./build

EXPOSE 5173

CMD ["serve", "-s", "build"]