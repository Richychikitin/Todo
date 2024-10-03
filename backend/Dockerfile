# Usar la imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Instalar nodemon globalmente (opcional, para desarrollo)
RUN npm install -g nodemon

# Copiar el resto de los archivos del backend
COPY . .

# Exponer el puerto del backend
EXPOSE 5000

# Iniciar el servidor
CMD ["npm", "start"]
