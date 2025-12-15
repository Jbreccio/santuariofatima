# backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app/backend

# Copia package.json e instala dependências
COPY backend/package*.json ./
RUN npm ci --only=production

# Copia o restante do código
COPY backend/ .

# Build do TypeScript
RUN npm run build

# Estágio de produção
FROM node:18-alpine

WORKDIR /app/backend

# Copia node_modules e build do estágio anterior
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package*.json ./

# Usuário não-root para segurança
USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]