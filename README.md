# TiendaFitness 🏋️‍♂️💪

**Descripción**  

Este es un proyecto backend para una tienda de productos fitness. Permite gestionar usuarios, categorías de productos y productos en sí mismos 
de manera segura. Además de las operaciones CRUD básicas, el proyecto incluye funcionalidades para la carga de imágenes mediante Multer, 
autenticación basada en JSON Web Tokens (JWT) y manejo de sesiones.
---

## 🚀 Tecnologías utilizadas

- **Node.js** 🟩
- **Express** 🌐
- **MongoDB** 🗃️
- **Mongoose** 🧑‍💻
- **bcrypt** 🔒
- **jsonwebtoken** 🛡️
- **dotenv** 📄
- **cors** 🔗
- - **multer** 📷
---

## ⚡ ¿Cómo correr el proyecto?

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/adrian161103/TiendaFitness.git
   ```
   
---
2. **Instalar las dependencias:**
```bash
npm install
```

---
3. **Crea un archivo .envcon las siguientes variables de entorno:**
```bash
PORT=3000
MONGODB_URI="mongodb://127.0.0.1:27017/example"
```

---
4. **Iniciar el servidor:**
```bash
npm run dev
```

---

## 🛠️ Endpoints:
- **USUARIO**
- POST /api/user/register : Registra un nuevo usuario 👤
- GET /api/user/get : Obtiene todos los usuarios 👀
- DELETE /api/user/delete/ :id : Elimina un usuario 🗑️
- PUT /api/ user/update/ :id : Actualiza un usuario ✏️
- POST /api/user/login : Inicia sesión 🔐
  
- **PRODUCTO**
- GET /api/product/get : Obtiene todos los productos 📦
- POST /api/product/create : Crea un nuevo producto ➕
- GET /api/product/get-by-id/ :id : Obtiene un producto por ID 🏷️
- POST /api/product/get-by-name : Obtiene un producto por nombre 🔍
- PUT /api/product/update/ :id : Actualiza un producto ✏️
- DELETE /api/product/delete/ :id : Elimina un producto 🗑️
  
- **CATEGORIA**
- GET /api/category/get : Obtiene todas las categorías 🏷️
- POST /api/category/create : Crea una nueva categoría ➕
- DELETE /api/category/delete/ :id : Elimina una categoría 🗑️
---
## 🧑‍💻**Detalles adicionales del código** 
- **Manejo de Carga de Imágenes con Multer** 
- Configuración de Multer:
 El proyecto utiliza Multer (configurado en src/middlewares/upload.js) para gestionar la carga de archivos. Se define un almacenamiento 
 personalizado que:

  -Destino: Guarda los archivos en la carpeta src/uploads/.
  -Nombre único: Genera un nombre único para cada archivo combinando el nombre del campo, la fecha y un número aleatorio junto con la extensión 
   original.
  -Filtro de archivos: Solo permite la carga de archivos cuyo mimetype comience con "image/", asegurando que se suban únicamente imágenes.

-Integración en el endpoint:

En la ruta de productos (src/routes/productRoute.js), el endpoint POST /api/product/create utiliza el middleware upload.single("image") para 
procesar el archivo. En el controlador (createProduct en src/controlers/productController.js), si se recibe un archivo se asigna la URL 
generada a la propiedad imageUrl del producto.
---
## **Seguridad y Organización**
-Autenticación:
 Se implementa autenticación basada en JSON Web Tokens (JWT). El middleware verifyTokenMiddleware.js se encarga de verificar el token enviado 
 en la cabecera Authorization, garantizando que solo usuarios autenticados puedan acceder a determinados endpoints.

-Manejo de Sesiones:
 Se utiliza express-session para gestionar sesiones, proporcionando una capa adicional de seguridad y control del estado del usuario.

-Estructura Modular:
 El proyecto está organizado en módulos:

  -Controladores: Lógica de negocio y operaciones CRUD (por ejemplo, productController.js).
  -Rutas: Definición de endpoints (por ejemplo, productRoute.js).
  -Middlewares: Funcionalidades auxiliares como la verificación de tokens y la carga de archivos.
  -Modelos: Esquemas y modelos para MongoDB.
  -Servir Archivos Estáticos:
   En src/index.js se configura Express para servir archivos estáticos desde el directorio uploads, permitiendo el acceso público a las 
   imágenes subidas.

---
## **Usando Postman o Thunder**
- Ejemplo de como /crear un usuario, usando Postman (se hace de manera similar en thunder).
  
![image](https://github.com/user-attachments/assets/484b6a71-894b-4c22-9232-bfdeb88e73e5)



  ---
  ## 🙏 ¡Gracias por utilizar este proyecto!:
Si tienes preguntas o sugerencias, no dudes en contactarme o hacer un iusse. Espero que este backend de tienda fitness sea útil para tus proyectos. ¡Gracias! 😄





