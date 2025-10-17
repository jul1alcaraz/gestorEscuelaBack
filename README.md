**Gestor Escuela Backend**
Organiza tu institucion academica gestionando a tus alumnos, sabiendo sus datos y a que cursos estan inscriptos. 
            
 **Permite:**
   -Cargar alumnos, sus datos y catedras que cursa.
   -Buscarlos por ID, NOMBRE Y CURSO.
   -Editar
   -Eliminar.
    
**Tecnologías Utilizadas**  
    - **Frontend**: 
    - **Backend**: Node.js, Express.js.
    - **Base de Datos**: MongoDB con Mongoose, MongoAtlas.
    - **Extras**: Material-UI.
    
**Cómo Instalar y Usar**
            A. **Clonar el repositorio**:
            -En la terminal: git clone https://github.com/jul1alcaraz/gestorEscuelaBack.git

            B.**Instalar dependencias**:
            - npm install
            
**Configurar variables de entorno**:
            MONGO_URI = mongodb+srv://licAlcarazAballay2022:Pancho123-@gestionescolar.q857wmh.mongodb.net/?retryWrites=true&w=majority&appName=gestionEscolar
            PORT = 3000
            
**Ejecutar el proyecto**:
            -npm run dev 

**Estructura del Proyecto**
    <img width="166" height="249" alt="image" src="https://github.com/user-attachments/assets/045e517c-6a78-4a9a-b7b2-71ee9f257fb1" />

**API Endpoints**
        
    | Método |             Endpoint              | Descripción |
    | POST |             `/estudiantes`          | Registro de usuario |
    | GET |              `/estudiantes`          | Obtiene todos los estudiantes |
    | GET |              `/estudiantes/id`       | Obtiene los estudiantes por ID|
    | GET |              `/estudiantes?curso=`   | Obtiene los estudiantes por curso|
    | DEL |              `/estudiantes/id`       | Elimina los estudiantes por ID |
    | PUT |              `/estudiantes/id`       | Actualiza los estudiantes por ID |




