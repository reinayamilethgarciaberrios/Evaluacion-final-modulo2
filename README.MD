run microservice:
`docker-compose up --build`
or
`sudo docker-compose up --build`

## DOCKERFILE

Este es un archivo Dockerfile que describe cómo construir una imagen de contenedor de Docker para una aplicación Node.js.

Aquí hay una explicación línea por línea del Dockerfile:

```
FROM node
```

Indica que la imagen base para construir nuestra imagen será la imagen oficial de Node.js que se encuentra en Docker Hub.

```
COPY . /app
```

Copia todos los archivos y directorios en el directorio actual a la ruta `/app` dentro del contenedor.

```
WORKDIR /app
```

Establece el directorio de trabajo actual dentro del contenedor en `/app`.

```
RUN npm install
```

Ejecuta el comando `npm install` dentro del contenedor para instalar todas las dependencias necesarias para la aplicación.

```
ENV PORT 3000
```

Establece una variable de entorno llamada `PORT` en el valor `3000`. Esta variable se utiliza más adelante en la aplicación para indicar en qué puerto escuchar.

```
EXPOSE 3000
```

Expone el puerto `3000` en el contenedor, lo que permite que otros contenedores o aplicaciones accedan a la aplicación que se está ejecutando en ese puerto.

```
ENTRYPOINT ["npm", "start"]
```

Establece el comando de inicio predeterminado para el contenedor. Cuando se inicia el contenedor, se ejecutará el comando `npm start` para iniciar la aplicación Node.js.

### En resumen, este Dockerfile define cómo construir una imagen de contenedor para una aplicación Node.js, copiando el código fuente en el contenedor, instalando las dependencias necesarias, exponiendo un puerto para acceder a la aplicación y definiendo un comando de inicio predeterminado para el contenedor.

## DOCKER COMPOSE

Este es un archivo YAML que se utiliza para definir la configuración de Docker Compose, que es una herramienta que permite definir y ejecutar aplicaciones Docker de varios contenedores. A continuación, se explican las líneas de código del archivo y su funcionalidad:

```
version: "3"
```

Esta es la versión de Docker Compose que se utilizará para definir la configuración.

```
services:
```

Este bloque define los servicios que se ejecutarán en contenedores separados.



```
  datosPerros:
    build: ./microservices/author-service
```

Este servicio se llama `datosPerros` y utiliza la imagen construida en el directorio `./microservices/datosPerros-service`.

```
  premios:
    build: ./microservices/premios-service
```

Este servicio se llama `premios` y utiliza la imagen construida en el directorio `./microservices/premios-service`.

```
  raza:
    build: ./microservices/raza-service
```

Este servicio se llama `raza` y utiliza la imagen construida en el directorio `./microservices/raza-service`.


```
  nginx:
    image: nginx:latest
    ports:
      - "8080:8080"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - datosPerros
      - premios
      - raza
    
```

Falto funcionamiento en el ejercicio 3,
funcionan 1,2,4