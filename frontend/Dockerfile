# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app/frontend

# Copia package.json e instala dependências
COPY frontend/package*.json ./
RUN npm ci

# Copia o restante e faz build
COPY frontend/ .
RUN npm run build

# Servidor Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copia os arquivos buildados
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copia configuração customizada do nginx (opcional)
# COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]