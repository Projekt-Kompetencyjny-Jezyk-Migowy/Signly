# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
COPY index.html ./
COPY src ./src
# Adjust copy commands to your structure

RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
