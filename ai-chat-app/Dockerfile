# BUILD STAGE
FROM node:20-alpine AS builder

# WORKING DIRECTORY
WORKDIR /app

# COPY PACKAGE FILES
COPY package*.json ./

# INSTALL DEPENDENCIES
RUN npm install

# COPY PROJECT FILES
COPY . .

# REMOVE OLD BUILD
RUN rm -rf dist

# BUILD APPLICATION
RUN npm run build

# PRODUCTION STAGE
FROM nginx:stable-alpine

# REMOVE DEFAULT NGINX FILES
RUN rm -rf /usr/share/nginx/html/*

# COPY BUILD FILES
COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE PORT
EXPOSE 80

# START NGINX
CMD ["nginx", "-g", "daemon off;"]