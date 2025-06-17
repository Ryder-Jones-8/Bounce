FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm --workspace apps/api run build
CMD ["npm", "--workspace", "apps/api", "run", "start"]
