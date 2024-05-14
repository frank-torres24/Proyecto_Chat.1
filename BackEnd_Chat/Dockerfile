# Establece la imagen base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["node", "app.js"]
