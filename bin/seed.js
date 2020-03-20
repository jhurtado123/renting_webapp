const mongoose = require('mongoose');
const User = require('../models/User');
const Ad = require('../models/Ad');

mongoose
  .connect('mongodb+srv://root:toor@cluster0-v1vur.mongodb.net/rentapp', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const users = [
  {
    "_id": new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
    "rol":['ROLE_USER'],
    "username":"jaime@jaime.com",
    "name": "Jaime Mora",
    "description" : "Tengo los mejores prisos al mejor precio",
    "password":"$2b$10$EBSbP/cCcv7wRzVvodrP2u3jLa6vC9c9M.Lhb1EvC5sAuDHlZ7hlq",
    "profile_image":"/seeds-images/admins.jpg",
    "reviews":[]
  },
  {
    "_id": new mongoose.Types.ObjectId('56cb91bdc3464f14678934ba'),
    "rol":['ROLE_USER'],
    "username":"jose@jose.com",
    "name": "Jose Hurtado",
    "description" : "Tengo los mejores prisos al mejor precio",
    "password":"$2b$10$EBSbP/cCcv7wRzVvodrP2u3jLa6vC9c9M.Lhb1EvC5sAuDHlZ7hlq",
    "profile_image":"/seeds-images/admins.jpg",
    "reviews":[]
  },
  {
    "rol":['ROLE_USER'],
    "username":"carlos@carlos.com",
    "name": "Carlos Gonzalez",
    "password":"$2b$10$EBSbP/cCcv7wRzVvodrP2u3jLa6vC9c9M.Lhb1EvC5sAuDHlZ7hlq",
    "profile_image":"/seeds-images/carlos.jpeg",
    "reviews":[]
  },
  {
    "rol":['ROLE_USER'],
    "username":"anna@anna.com",
    "name": "Anna Claver",
    "description" : "Persona tranquila",
    "password":"$2b$10$EBSbP/cCcv7wRzVvodrP2u3jLa6vC9c9M.Lhb1EvC5sAuDHlZ7hlq",
    "profile_image":"/seeds-images/anna.jpg",
    "reviews":[]
  },
  {
    "rol":['ROLE_USER'],
    "username":"cristina@cristina.com",
    "name": "Cristina Febrer",
    "description" : "Me gusta mucho salir en bicicleta y estar con las amigas",
    "password":"$2b$10$EBSbP/cCcv7wRzVvodrP2u3jLa6vC9c9M.Lhb1EvC5sAuDHlZ7hlq",
    "profile_image":"/seeds-images/cristina.jpg",
    "reviews":[]
  },
  {
    "rol":['ROLE_USER'],
    "username":"juan@juan.com",
    "name": "Juan Garcia",
    "description" : "Soltero y me defino como una persona tranquila.",
    "password":"$2b$10$EBSbP/cCcv7wRzVvodrP2u3jLa6vC9c9M.Lhb1EvC5sAuDHlZ7hlq",
    "profile_image":"/seeds-images/juan.jpg",
    "reviews":[]
  },
  {
    "_id": new mongoose.Types.ObjectId('56cb91bdc3464f14678934aa'),
    "rol":['ROLE_USER'],
    "username":"manu@manu.com",
    "name": "Manu Pacheco",
    "description" : "Los mejores pisos al mejor precio",
    "password":"$2b$10$EBSbP/cCcv7wRzVvodrP2u3jLa6vC9c9M.Lhb1EvC5sAuDHlZ7hlq",
    "profile_image":"/seeds-images/admins.jpg",
    "reviews":[]
  },
];

//manu  56cb91bdc3464f14678934aa
//jaime 56cb91bdc3464f14678934ca
//jose 56cb91bdc3464f14678934ba


const ads = [
  {
    "images": ["/seeds-images/piso11.jpeg","/seeds-images/piso12.jpeg","/seeds-images/piso13.jpeg","/seeds-images/piso14.jpeg","/seeds-images/piso15.jpeg"],
    "title": "Piso en Carrer de Sants",
    "owner": "56cb91bdc3464f14678934aa",
    "neighborhood": "Hostafrancs-Sants",
    "address": "carrer de sants",
    "number": "102",
    "city": "Barcelona",
    "postal_code": "08014",
    "price": 1090,
    "coords": {"lat": 41.3825, "lng": 2.17694},
    "description": "PISO DE 2 HABITACIONES, COMEDOR, COCINA Y BAÑO, EN MUY BUEN ESTADO, TODO EXTERIOR, CON LUZ, BALCÓN, JUNTO METRO L1 HOSTAFRANCS",
    "parameters": {"square_meters": 90, "flat_status": 5, "terrace": true, "rooms": 2, "bathrooms": 2, "height": 2, "storage_room": false, "parking": false}
  },
  {"images":["/seeds-images/piso21.jpeg","/seeds-images/piso22.jpeg","/seeds-images/piso23.jpeg","/seeds-images/piso24.jpeg","/seeds-images/piso25.jpeg"],
    "title":"Piso en Carrer Reina Amàlia",
    "owner":"56cb91bdc3464f14678934aa",
    "neighborhood":"Ciutat Vella-El Raval",
    "address":"Carrer Reina Amàlia",
    "number":"24","city":"Barcelona",
    "postal_code":"08001",
    "price":950,
    "coords":{"lat":41.377045,"lng":2.166621},
    "description":"Piso con muchas posibilidades de reforma! Situado en la calle Reina Amalia, se encuentra en la última planta del edificio, sin vecinos arriba y sí con una terraza de uso privativo. El piso consta de 61 m2, 3 habitaciones (una de ellas doble y alcoba), un balcón muy soleado y un baño con ducha de barco. Comedor de 9 m2, salón de 10 m2... Muchas posibilidades para reformarlo y construir su vivienda ideal. La finca no dispone de ascensor. ",
    "parameters":{"square_meters":60,"flat_status":4,"terrace":true,"rooms":3,"bathrooms":1,"height":4,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso31.jpeg","/seeds-images/piso32.jpeg","/seeds-images/piso33.jpeg","/seeds-images/piso34.jpeg","/seeds-images/piso35.jpeg","/seeds-images/piso36.jpeg"],
    "title":"Ático en Pedralbes",
    "owner":"56cb91bdc3464f14678934aa",
    "neighborhood":"Pedralbes-Sarriá",
    "address":"Av. de Pearson",
    "number":"21",
    "city":"Barcelona",
    "postal_code":"08034",
    "price":2500,
    "coords":{"lat":41.393364,"lng":2.107045},
    "description":"En una de las zonas más exclusivas de Barcelona, encontramos un ático muy singular, decorado con gran elegancia y manteniendo en su finca modernista, un aroma arquitectónico que la hacen especial.\r\n\r\nEste ático se encuentra decorado con un gusto único. En la planta baja, encontramos un amplio recibidor al que se accede de manera directa desde el ascensor, un salón – comedor muy amplio que luce un gran ventanal para poder disfrutar de unas vistas espectaculares a Barcelona, una cocina tipo office totalmente equipada, tres grandes suites con baño y armarios empotrados todas ellas, una de las cuales actualmente está destinada como despacho. Los techos que visten la vivienda, son altos y abohardillados. ",
    "parameters":{"square_meters":218,"flat_status":5,"terrace":true,"rooms":4,"bathrooms":3,"height":null,"storage_room":true,"parking":false}
  },
  {"images":["/seeds-images/piso41.jpeg","/seeds-images/piso42.jpeg","/seeds-images/piso43.jpeg","/seeds-images/piso44.jpeg","/seeds-images/piso45.jpeg"],
    "title":"Piso en Calle Carrer del Doctor Aiguader",
    "owner":"56cb91bdc3464f14678934aa",
    "neighborhood":"Barceloneta y Sant Pere",
    "address":"Carrer del Doctor Aiguader",
    "number":"36",
    "city":"Barcelona",
    "postal_code":"08003",
    "price":1200,
    "coords":{"lat":41.383026,"lng":2.189102},
    "description":"Gran piso de mas de 100m2 en el precioso barrio de la Barceloneta . Actualmente consta de 4 amplias habitaciones una de ellas suite, 2 baños completos , un gran y luminoso salón comedor totalmente exterior y una amplia cocina mas un útil fregadero. ",
    "parameters":{"square_meters":119,"flat_status":2,"terrace":true,"rooms":4,"bathrooms":2,"height":null,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso51.jpeg","/seeds-images/piso52.jpeg","/seeds-images/piso53.jpeg","/seeds-images/piso54.jpeg","/seeds-images/piso55.jpeg"],
    "title":"Piso en Carrer de la Democràcia",
    "owner":"56cb91bdc3464f14678934aa",
    "neighborhood":"Sant Martí",
    "address":"Carrer de la Democràcia",
    "number":"11",
    "city":"Barcelona",
    "postal_code":"08018",
    "price":850,
    "coords":{"lat":41.409609,"lng":2.19245},
    "description":"Finca muy bien ubicada junto al parque del Clot, calle tranquila semi peatonal, zona con todos los servicios, a 5 minutos del Centre Comercial Glorias, excelente comunicación con transporte público, Lineas 1, y 2 de metro, RENFE CLOT, TRAM, y diversas lineas de autobús.La vivienda esta reformada, lista para entrar a vivir, consta de 3 habitaciones, 1 doble con salida a balcón y vistas despejadas, con orientación Sur, 2 habitaciones individuales exteriores, salón comedor, cocina independiente completamente equipada y con todos los electrodomésticos, baño completo con plato de ducha.El piso tiene calefacción, aire acondicionado, suelos de parquet, techos con volta catalana, altillos.La propiedad deja todos los muebles y electrodomésticos en el piso.",
    "parameters":{"square_meters":65,"flat_status":4,"terrace":false,"rooms":3,"bathrooms":1,"height":4,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso61.jpeg","/seeds-images/piso62.jpeg","/seeds-images/piso63.jpeg","/seeds-images/piso64.jpeg","/seeds-images/piso65.jpeg"],
    "title":"Piso en Avenida de Vallcarca",
    "owner":"56cb91bdc3464f14678934ba",
    "neighborhood":"Vallcarca i Los Penitentes",
    "address":"Avinguda de Vallcarca",
    "number":"151",
    "city":"Barcelona",
    "postal_code":"08023",
    "price":1400,
    "coords":{"lat":41.414457,"lng":2.14302},
    "description":"Bonito piso en el Barrio de Gràcia, y en la zona de Vallcarca, de 75m2 más un balcón, que en la actualidad está cubierto (cabe la posibilidad de descubrirlo y dejar una agradable terraza). ",
    "parameters":{"square_meters":75,"flat_status":4,"terrace":true,"rooms":3,"bathrooms":1,"height":2,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso71.jpeg","/seeds-images/piso72.jpeg","/seeds-images/piso73.jpeg","/seeds-images/piso74.jpeg","/seeds-images/piso75.jpeg"],
    "title":"Piso en Passeig de Fabra I Puig",
    "owner":"56cb91bdc3464f14678934ba",
    "neighborhood":"Vilapicina i La Torre Llobeta",
    "address":"Passeig de Fabra I Puig",
    "number":"241",
    "city":"Barcelona",
    "postal_code":"08031",
    "price":750,
    "coords":{"lat":41.430319,"lng":2.17398},
    "description":"MAGNIFICA VIVIENDA CON PLAZA DE PARKING. UBICADA EN UNA DE LAS ARTERIAS PRINCIPALES DE NOU BARRIS COMO LO ES EL PASEO FABRA I PUIG, QUE CUENTA CON DIVERSA VARIEDAD DE COMERCIOS, ZONAS VERDES, LUGARES DE OCIO Y ADEMAS ESTA EXCELENTEMENTE COMUNICADO POR LAS DISTINTAS LINEAS DE AUTOBUS QUE CIRCULAN POR EL, DICHA VIVIENDA ESTA ENTRE DOS ESTACIONES DE METRO DE LA LINEA AZUL, VIRREI AMAT Y VILAPICINA.\r\nEL PISO CONSTA DE 75M2. DISTRIBUIDOS EN TRES HABITACIONES, UNA DE ELLAS DOBLE Y DOS INDIVIDUALES, BAÑO AMPLIO Y COMPLETO CON BAÑERA, LA COCINA Y EL COMEDOR, MUY LUMINOSOS Y CON SALIDA AL BALCÓN, QUE TIENE VISTAS AL PASEO FABRA Y PUIG Y ESTA ORIENTADO A MAR. EL ESTADO GENERAL ES MUY BUENO, PARA ENTRAR A VIVIR, SUELOS DE GRES, PUERTAS DE MADERA BARNIZADAS Y VENTANAS Y PERSIANAS DE PVC BLANCO.",
    "parameters":{"square_meters":75,"flat_status":2,"terrace":true,"rooms":3,"bathrooms":1,"height":2,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso81.jpeg","/seeds-images/piso82.jpeg","/seeds-images/piso83.jpeg","/seeds-images/piso84.jpeg","/seeds-images/piso85.jpeg"],
    "title":"Piso en Calle Nicaragua",
    "owner":"56cb91bdc3464f14678934ba",
    "neighborhood":"L Nou Esquerra de L Eixample",
    "address":"Calle Nicaragua",
    "number":"86",
    "city":"Barcelona",
    "postal_code":"08029",
    "price":1600,
    "coords":{"lat":41.38492,"lng":2.139515},
    "description":"Privilegiada ubicación, con todo tipo de servicios como comercios, restaurantes, colegios, universidades, hospitales, y perfectamente comunicada con el transporte, cerca de la estación de Sants y de la plaza de Francesc Macià. ",
    "parameters":{"square_meters":100,"flat_status":5,"terrace":true,"rooms":2,"bathrooms":2,"height":3,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso91.jpeg","/seeds-images/piso92.jpeg","/seeds-images/piso93.jpeg","/seeds-images/piso94.jpeg","/seeds-images/piso95.jpeg"],
    "title":"Ático en Carrer Nou de Sant Francesc",
    "owner":"56cb91bdc3464f14678934ba",
    "neighborhood":"Barrio Gótico",
    "address":"Carrer Nou de Sant Francesc",
    "number":"21",
    "city":"Barcelona",
    "postal_code":"08002",
    "price":895,
    "coords":{"lat":41.379004,"lng":2.177872},
    "description":"Gran oportunidad! Ático de dos habitaciones al lado de Las Ramblas. Consta de amplio salón comedor exterior a soleada terraza de uso privativo, cocina independiente equipada con electrodomésticos y menaje de cocina, una habitación doble con amplio vestidor, una habitación individual y un baño completo. Ubicado en finca rehabilitada, en tercera planta real con ascensor. Muy bien comunicado con metros Drassanes y Barceloneta. ",
    "parameters":{"square_meters":76,"flat_status":3,"terrace":true,"rooms":2,"bathrooms":1,"height":3,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso101.jpeg","/seeds-images/piso102.jpeg","/seeds-images/piso103.jpeg","/seeds-images/piso104.jpeg","/seeds-images/piso105.jpeg"],
    "title":"Piso en Calle Bruc",
    "owner":"56cb91bdc3464f14678934ba",
    "neighborhood":"Dreta de L Eixample",
    "address":"Carrer Bruc",
    "number":"80",
    "city":"Barcelona",
    "postal_code":"08009",
    "price":1230,
    "coords":{"lat":41.394102,"lng":2.170272},
    "description":"Encantador piso situado en la calle Bruc junto a la Diagonal. Es un cuarto piso de altura con ascensor.Dispone de un amplio salón-estar, cocina independiente, cuatro habitaciones (dos dobles y dos individuales), baño completo y lavadero u0022antes aseou0022. Vivienda muy luminosa. Azotea comunitaria con trastero privado.Cerca de todos los servicios y lugares de ocio: escuelas, restaurantes, centros médicos, mercado, metro, autobuses urbanos.",
    "parameters":{"square_meters":117,"flat_status":4,"terrace":false,"rooms":null,"bathrooms":null,"height":null,"storage_room":true,"parking":false}
  },
  {"images":["/seeds-images/piso111.jpeg","/seeds-images/piso112.jpeg","/seeds-images/piso113.jpeg","/seeds-images/piso114.jpeg","/seeds-images/piso115.jpeg"],
    "title":"Piso en De Sant Salvador",
    "owner":"56cb91bdc3464f14678934ca",
    "neighborhood":"Gracia-La Salud",
    "address":"Carrer de Sant Salvador, 87, 08024",
    "number":"87",
    "city":"Barcelona",
    "postal_code":"08024",
    "price":1125,
    "coords":{"lat":41.41,"lng":2.16},
    "description":"Piso en la Villa de Gracia completamente exterior y reformado. Situado en la Segunda planta del edificio encontramos este luminoso y fantástico piso con luz natural en todas las dependencias (incluida cocina). El piso se distribuye en: recibidor con armario empotrado, salón-comedor con salida a terraza, cocina exterior, 4 dormitorios (3 dobles y 1 individual), baño y aseo. A destacar que en la terraza del piso caben mesa y sillas con lo que se puede disfrutar al Máximo. El piso se encuentra completamente reformado con suelos de parquet, cierres de aluminio, aire acondicionado, etc. Actualmente la finca no dispone de ascensor pero la Comunidad está empezando a gestionar su Instalación. Magnífica zona con todos los servicios a su alcance. Disfrute de la luz natural que tiene este fantástico y único piso de Gracia.",
    "parameters":{"square_meters":93,"flat_status":4,"terrace":false,"rooms":2,"bathrooms":1,"height":2,"storage_room":true,"parking":false}
  },
  {"images":["/seeds-images/piso121.jpeg","/seeds-images/piso122.jpeg","/seeds-images/piso123.jpeg","/seeds-images/piso124.jpeg","/seeds-images/piso125.jpeg"],
    "title":"Piso en Carrer de Santa Joana D'arc",
    "owner":"56cb91bdc3464f14678934ca",
    "neighborhood":"El Carmelo-El Guinardó",
    "address":"Carrer de Santa Joana D'arc",
    "number":"30",
    "city":"Barcelona",
    "postal_code":"08032",
    "price":670,
    "coords":{"lat":41.428287,"lng":2.158722},
    "description":"Situado en el centro de Horta, planta baja en venta\r\nConsta de 57m² distribuido en dos habitaciones dobles, salón-comedor dos ambientes de 22m² aprox., cocina tipo office, baño completo de cuatro piezas (con plato de ducha) reformado y salida a pequeña terraza de 6m², con zona de lavado en cerramiento de aluminio y acceso a un trastero\r\nDispone de calefacción en toda la vivienda, se encuentra para entrar a vivir\r\nMuy bien situado, junto a todos los servicios, al lado del eje comercial de Horta, bien comunicado mediante líneas de autobús y metro L5 Horta, y fácil acceso a Ronda de Dalt",
    "parameters":{"square_meters":57,"flat_status":2,"terrace":false,"rooms":2,"bathrooms":1,"height":1,"storage_room":false,"parking":false}
  },
  {"images":["/seeds-images/piso131.jpeg","/seeds-images/piso132.jpeg","/seeds-images/piso133.jpeg","/seeds-images/piso134.jpeg","/seeds-images/piso135.jpeg"],
    "title":"Piso en Carrer de Johann Sebastian Bach",
    "owner":"56cb91bdc3464f14678934ca",
    "neighborhood":"Muntaner",
    "address":"Carrer de Johann Sebastian Bach",
    "number":"9",
    "city":"Barcelona",
    "postal_code":"08021",
    "price":2700,
    "coords":{"lat":41.395976,"lng":2.139436},
    "description":"Finca a 4 vientos de un reconocido arquitecto. Junto a turó park. Piso alto muy luminoso con amplias estancias y completamente exterior. La vivienda está a reformar. Ideal para realizar un exclusivo proyecto a escasos metros de turó park.",
    "parameters":{"square_meters":461,"flat_status":5,"terrace":true,"rooms":5,"bathrooms":6,"height":1,"storage_room":true,"parking":false}
  },
  {"images":["/seeds-images/piso141.jpeg","/seeds-images/piso142.jpeg","/seeds-images/piso143.jpeg","/seeds-images/piso144.jpeg","/seeds-images/piso145.jpeg"],
    "title":"Piso en Calle Madrazo",
    "owner":"56cb91bdc3464f14678934ca",
    "neighborhood":"Sant Gervasi",
    "address":"Calle Madrazo",
    "number":"32",
    "city":"Barcelona",
    "postal_code":"08006",
    "price":1540,
    "coords":{"lat":41.400547,"lng":2.149136},
    "description":"Fabuloso piso a estrenar en venta de 129m² situado en el corazón de Sant Gervasi-Galvany.\r\nDispone de salón comedor con cocina abierta totalmente equipada, 3 habitaciones exteriores (1 suite y 2 dobles) y 2 estancias polivalentes (despacho o vestidor). Amplios espacios y gran luminosidad.\r\nCuenta con suelos de parquet, chimenea, aire acondicionado (frío – calor) y carpintería exterior de aluminio.\r\nUbicado en la calle Madrazo, una exclusiva zona comercial con todo tipo de servicios y con excelentes comunicaciones con transporte público, buses y Ferrocarrils de la Generalitat de Catalunya (parada - Sant Gervasi).",
    "parameters":{"square_meters":129,"flat_status":3,"terrace":false,"rooms":2,"bathrooms":1,"height":3,"storage_room":true,"parking":false}
  },
  {"images":["/seeds-images/piso151.jpeg","/seeds-images/piso152.jpeg","/seeds-images/piso153.jpeg","/seeds-images/piso154.jpeg","/seeds-images/piso155.jpeg"],
    "title":"Ático en Calle Carrer del Putget",
    "owner":"56cb91bdc3464f14678934ca",
    "neighborhood":"Vallcarca i Los Penitentes",
    "address":"Carrer del Putget",
    "number":"28",
    "city":"Barcelona",
    "postal_code":"08023",
    "price":1350,
    "coords":{"lat":41.405728,"lng":2.143422},
    "description":"C Putxet – Jto. a los Jardines del Turo del Putxet. Excepcional Ático A REFORMAR de 132m2 construidos + 105M2 de impresionante terraza con vistas al Parque del Putxet gozando de sol todo el día. Actualmente la vivienda se compone de 4 Habitaciones ( 3 habitaciones dobles siendo a día de hoy 2h interiores y 1 h exterior a la terraza + 1 habitación individual de 7m2 exterior a la terraza) + 3 baños. Bonito salón comedor muy luminoso y soleado de 21M2 con vistas al Parque del Putxet y acceso directo a la majestuosa terraza de 100M2 que rodea toda la vivienda y que te hará sentir y desconectar del bullicio de la ciudad. Cocina independiente tipo office exterior muy luminosa. La vivienda cuenta con entrada principal y de servicio en finca de obra vista con muy buena presencia y servicio de portería. Ascensor. Suelos de parquet, calefacción por radiadores, persianas motorizadas en el comedor, Aire Acondicionado por Splits. Plaza de PKG incluida en finca próxima. Estamos ante un pieza única y exclusiva con muchísimas posibilidades ubicada en el barrio del Putxet que está ubicado en la zona alta de Barcelona, siendo uno de los barrios de clase alta de la ciudad. El Putxet es una montaña ubicada entre los barrios de Vallcarca y Sant Gervasi. Desde el siglo XIX se trataba de un barrio de veraneo para los habitantes de Barcelona, pero luego, con la instalación de mejores vías de comunicación se convirtió en una zona para la residencia habitual de la clase alta de la ciudad.",
    "parameters":{"square_meters":132,"flat_status":2,"terrace":true,"rooms":4,"bathrooms":3,"height":3,"storage_room":false,"parking":false}
    }
];

User.create(users)
  .then(savedUsers => {
    console.log(`Created ${savedUsers.length} records`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));

Ad.create(ads)
  .then(savedAds => {
    console.log(`Created ${savedAds.length} records`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));