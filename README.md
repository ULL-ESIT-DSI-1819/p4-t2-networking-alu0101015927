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

Nuestro programa de servidor no hace nada con la conexión todavía. Vamos a arreglar eso usándolo para enviar alguna información útil al cliente.

#### Escribiendo datos por un Socket 

Crearemos un directorio llamado networking para guardar el código que escribiremos. Luego en el editor escribiremos lo siguiente:

![imagen net-watcher.js](src/net-watcher.png)

Podemos ver que en la parte superior hemos incluido los módulos principales de Node.js fs y net.

El nombre del archivo a observar, si se proporcionase, sería el tercer argumento (índice 2) en process.argv. Si el usuario no proporcionase un archivo lanzamos un Error personalizado. Los errores no detectados harán que el proceso Node.js se detenga después de enviar un seguimiento de pila a un error estándar.

Si miramos la función createServer podemos ver que su llamada devuelve tres cosas:

- Informa que la conexión se ha establecido (tanto para el cliente con connection.write como para la consola).
- Comienza a escuchar los cambios en el archivo de destino, guardando el objeto de observador devuelto. Esta devolución de llamada envía información de cambio al cliente usando connection.write.
- Escucha el evento de cierre de la conexión para poder informar que el suscriptor se ha desconectado y dejar de ver el archivo, con watcher.close.

Finalmente, la devolución de llamada pasa a server.listen al final. Node.js invoca esta función después de que haya enlazado con éxito el puerto 60300 y esté listo para comenzar a recibir conexiones.

#### Conectandonos a un Servidor Socket TCP con Netcat 

Para ejecutar y probar el programa net-watcher, necesitará tres sesiones de terminal: una para el servicio en sí, una para el cliente y otra para activar los cambios en el archivo visto.

En la primera terminal usamos el comando watch para tocar el archivo de destino a intervalos de un segundo.

 	​$ ​​watch​​ ​​-n​​ ​​1​​ ​​touch​​ ​​target.txt​

Mientras esto se ejecuta, en la segunda terminal ejecutamos el programa net-watcher:

	​$ ​​node​​ ​​net-watcher.js​​ ​​target.txt​ ​ 	Listening for subscribers...

Este programa crea un servicio escuchando en el puerto TCP 60300. Para conectarnos a él usaremos netcat, un programa que utiliza socket. Abrimos una tercera terminal y usamos el comando nc:

 	​$ ​​nc​​ ​​localhost​​ ​​60300​
​ 	Now watching "target.txt" for changes...
​ 	File changed: Wed Dec 16 2015 05:56:14 GMT-0500 (EST)
​ 	File changed: Wed Dec 16 2015 05:56:19 GMT-0500 (EST)

si en tu sistema no tienes nc puedes usar telnet:

 	​$ ​​telnet​​ ​​localhost​​ ​​60300​
​ 	Trying 127.0.0.1...
​ 	Connected to localhost.
​ 	Escape character is '^]'.
​ 	Now watching "target.txt" for changes...
​ 	File changed: Wed Dec 16 2015 05:56:14 GMT-0500 (EST)
​ 	File changed: Wed Dec 16 2015 05:56:19 GMT-0500 (EST)
​ 	^]
​ 	​telnet>​​ ​​quit​
​ 	Connection closed.

En la terminal de net-watcher se verá el mensaje Subscriber connected.
Puede matar la sesion de nc con Ctrl-c. Si estas usando telnet, Ctrk-] y luego quit. Podrás ver que en la terminal de net-watcher aparece	Subscriber disconnected.

Para terminar el servicio net-watcher o el comando watch usamos Ctrl-c.

Múltiples subscriptores podrán conectarse y recibir actualizaciones simultaneamente. Si abrimos una terminal y nos comectamos al mismo puerto con nc recibiremos las actualizaciones cuando el fichero se cambie.

Los sockets TCP son útiles para la comunicación entre equipos conectados en red. Pero si necesita procesos en la misma computadora para comunicarse, los sockets Unix ofrecen una alternativa más eficiente. El módulo de red también puede crear este tipo de socket.

![imagen nc y telnet](src/telnet.png)

#### Escuchando en Sockets Unix 

Modificaremos el programa net-watcher para ver como funciona el módulo de red que usan los sockets de Unix.
Estos solo funcionan en entornos similares a Unix.

Cambianos .linten por 	.listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'));

Si obtiene un error que contiene EADDRINUSE, es posible que deba eliminar watcher.sock antes de ejecutar el programa nuevamente.
