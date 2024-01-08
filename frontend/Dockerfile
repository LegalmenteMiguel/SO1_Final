# Imagen base de Node.js
FROM node:18.18.0-alpine 

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Ejecuta la aplicación
CMD ["npm", "start"]