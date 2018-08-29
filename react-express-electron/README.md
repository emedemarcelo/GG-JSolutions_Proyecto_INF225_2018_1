# "Valoración de Opciones sobre Acciones" - Source Code

El programa consta de un programa desarrollado en ReactJS, Express y Electron, además de una API local de R que permite analizar los datos extraidos desde Yahoo Finance o de un archivo local.

### Instalación 
Instalación de dependencias:
```bash
npm install
```

Instalación de R y dependencias necesarias:
```bash
apt-get update
apt-get install r-base r-base-dev r-cran-rgl g++
```

### Compilación del programa:
```bash
npm run build
```
### Ejecución del programa

  Primeramente, ejecute la API local de R (**NOTA:** La primera vez que se ejecute se demorará, ya que instalará los paquetes necesarios antes de ejecutar la API).

Linux/MacOS:
```bash
- sudo Rscript main.R
```

Windows (ejecutar consola con permisos de administrador):
```bash
- Rscript main.R
```
Para el caso de Windows, procure agregar los ejecutables de R a la variable PATH. Dichos ejecutables se encuentran, por lo general, en la ruta C:\Program Files\R\R-\<version\>\bin\x64

  Luego, ejecute el programa principal mediante los siguientes comandos:

Windows: 

```bash
.\node_modules\.bin\electron .
```
Linux/MacOS: 
```bash 
electron . 
```

### Funcionamiento

<img src="documentation_img/1.png" alt="drawing" width="500"/>

*Figura 1: Pantalla principal de la aplicación*

<img src="documentation_img/2.png" alt="drawing" width="500"/>

*Figura 2: Solicitud de calculo de opciones de forma online*

<img src="documentation_img/3.png" alt="drawing" width="500"/>

*Figura 3: Solicitud de calculo de opciones de forma online lista*

<img src="documentation_img/4.png" alt="drawing" width="500"/>

*Figura 4: Acción analizada de forma online en la vista de resultados*

<img src="documentation_img/5.png" alt="drawing" width="500"/>

*Figura 5: Gráfico acción vs tiempo normalizado*

<img src="documentation_img/2b.png" alt="drawing" width="500"/>

*Figura 6: Solicitud de calculo de opciones de forma local*

<img src="documentation_img/3b.png" alt="drawing" width="500"/>

*Figura 7: Solicitud de calculo de opciones de forma local lista*

<img src="documentation_img/4b.png" alt="drawing" width="500"/>

*Figura 8: Acción analizada de forma local en la vista de resultados*

<img src="documentation_img/5b.png" alt="drawing" width="500"/>

*Figura 9: Gráfico acción vs tiempo normalizado*

El archivo de prueba está en la carpeta RAPI, llamado NFLX.csv.
