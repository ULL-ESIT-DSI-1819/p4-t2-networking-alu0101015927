# p4-t2-networking-alu0101015927
p4-t2-networking-alu0101015927 created by GitHub Classroom

Apuntes del capíturo 3, Node.js 8 the Right way.

## Redes con Sockets

Node.js fue diseñado desde cero para hacer programación en red.  Los sockets TCP forman la columna vertebral de las aplicaciones en red modernas. 

 ### Escucha de conexiones por Sockets
 
 Escucha de conexiones de zócalo

Los servicios en red existen para hacer dos cosas: conectar puntos finales y transmitir información entre ellos. No importa qué tipo de información se transmita, primero se debe hacer una conexión.

#### Enlazando un servidor a un puerto TCP
 
Las conexiones de socket TCP constan de dos puntos finales. Un punto extremo se enlaza a un puerto numerado, mientras que el otro punto extremo se conecta a un puerto.
 
En Node.js, las operaciones de enlace y conexión son proporcionadas por el módulo net. El enlace de un puerto TCP para escuchar conexiones es de la siguiente manera:

![imagen modulo net](src/net.png)

El método net.createServer toma una función de devolución de llamada y devuelve un objeto Servidor. Node.js invocará la función de devolución de llamada cuando se conecte otro punto final. El parámetro de conexión es un objeto Socket que puede utilizar para enviar o recibir datos.

Al llamar a server.listen se une el puerto especificado. En este caso, estamos vinculando el número de puerto TCP 60300.

