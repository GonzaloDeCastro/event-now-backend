
# Usa una imagen oficial de Node.js
FROM node:22

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiá los archivos de dependencias e instalalas
COPY package*.json ./
RUN npm install

# Copiá el resto del código
COPY . .

# Exponé el puerto en el que corre tu backend
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["npm", "start"]
