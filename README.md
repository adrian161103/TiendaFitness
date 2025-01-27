# TiendaFitness 🏋️‍♂️💪

**Descripción**  
Este es un proyecto backend para una tienda de productos fitness. Permite gestionar usuarios, categorías de productos, y productos en sí mismos, de manera segura.

---

## 🚀 Tecnologías utilizadas

- **Node.js** 🟩
- **Express** 🌐
- **MongoDB** 🗃️
- **Mongoose** 🧑‍💻
- **bcrypt** 🔒
- **jsonwebtoken** 🛡️
- **dotenv** 📄

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
MONGODB_URI="mongodb://127.0.0.1:27017/tp"
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






