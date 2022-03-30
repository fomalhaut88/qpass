# Base image
FROM node:15

# Set working directory
WORKDIR /app

RUN apt-get update

# Copy package.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy files
COPY . .

# Open port 8080
EXPOSE 8080

# Run server
CMD ["npm", "run", "serve"]
