# Usa una imagen base de Node.js con la versión requerida
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu aplicación Angular
COPY . .

# Instala las dependencias
RUN npm install

# Compila la aplicación Angular
RUN npm run build --prod

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=0 /app/dist/ferchau-front /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
