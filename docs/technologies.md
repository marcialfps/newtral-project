# Stack tecnológico

Dentro de los requisitos iniciales se han tomado una serie de decisiones de qué frameworks y librerías se han utilizado en este proyecto. Se ha intentado encajar cada tecnología al caso de uso dado y teniendo en cuenta posibles evoluciones del proyecto.

## Front-end

Para el front-end se ha considerado que el proyecto no crecerá significativamente a largo plazo y que en un futuro se podría considerar mejorar la UX.

### Typescript

TypeScript permite controlar el tipo de los datos utilizados y evitar errores inesperados. Dado que el framework utilizado lo soporta, se ha decidido utilizarlo. Esto nos permite crear tipos para los datos recibidos de la API y evitar respuestas no esperadas.

### NextJS framework

La [documentación de React](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks) recomienda utilizar uno de los siguientes frameworks: NextJS, Remix o Gatsby. Aunque cada uno de estos frameworks ofrecen diferentes soluciones, NextJS es [recomendado](https://medium.com/codex/next-js-vs-remix-vs-gatsby-which-one-to-choose-for-your-next-project-ab89fb8e48c4#:~:text=team's%20skill%20level.-,Next.,load%20times%20and%20SEO%20optimization.) para proyectos de pequeño/medio tamaño. En este caso se ha supuesto que el proyecto no crecería significativamente a largo plazo.

De la misma manera, NextJS soporta Server Side Rendering, que podría ser una buena solución para mejorar los tiempos de carga del sitio.

### Material UI

Aunque se permitió seleccionar entre MaterialUI o Bootstrap, las diferencias entre ambas librerías no son significantes para este proyecto. En este caso se ha decidido utilizar MaterialUI ya que el tamaño del bundle es menor y porque provee únicamente componentes que pueden ser utilizados directamente en el UI.

## Back-end

Al igual que el front-end, se ha supuesto que la API no extenderá su funcionalidad que pueda complicar su estructura en un futuro.

### NodeJS

En los requisitos se permite elegir entre NodeJS y Python. En este caso se ha decidio NodeJS ya que se dispone de mayor experiencia en el desarrollo de APIs con este lenguaje. Pero, debe de considerarse Python como una opción interesante ya que incluye un mayor número de librerías para el soporte de Machine Learning.

### ExpressJS

Actualmente, según [StateoOfJS del 2022](https://2022.stateofjs.com/en-US/other-tools/#backend_frameworks), los frameworks de back-end más utilizados son Nest y Express. En este caso se ha decidido utilizar Express partiendo de la misma premisa de que la API no crecerá en el futuro, ya que Express permite mayor flexibilidad al estructurar el proyecto. Pero, en cualquier caso, si se va a desarrollar un backend que pueda crecer y deba respetar una estructura se [recomienda](https://dev.to/muratcanyuksel/nestjs-vs-express-which-framework-to-choose-for-your-next-project-4ook#:~:text=NestJS%20provides%20a%20more%20structured,simple%20or%20small%2Dscale%20APIs.) utilizar Nest.

## Base de datos

### ElasticSearch

En los requisitos se indica que se debe utilizar ElasticSearch como base de datos. En este caso se conecta desde ExpressJS mediante el cliente para JavaScript.
