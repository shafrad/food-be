# RESTFul API for mini food commerce apps NODEJS BACKEND

Node.js Backend for RESTFul API services

## Requirement
- Expressjs (https://expressjs.com/)
- Sequelize (Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server) (https://sequelize.org/)

## Installations
Clone Project
```
$ git clone https://github.com/shafrad/food-be.git
```
Install Dependecies
```
# Clone Project
$ git clone https://github.com/shafrad/food-be.git

# Install Dependecies
$ npm install
```
## Environment Variable
Edit the config.json in the config folder
```
"username": "dbusername"
"password": "dbpassword"
"database": "dbname"
"host": "hostname"
"dialect": "mysql"
```

## Run migration DB
- Local
```
$ sequelize db:migrate
```

- Staging
```
$ sequelize db:migrate --env test
```
- Production
```
$ sequelize db:migrate --env production
```

## Run Server
```
$ npm start
```

## Nomor 2
```
Dalam hal menangani keamanan dalam pengiriman data (backend dan mobile apps) adalah dengan menggunakan Json Web Token (JWT).
Dalam penggunaannya JWT memberikan autorisasi pada pengguna yang telah melakukan login pada aplikasi dengan benar, pada saat
user telah berhasil login maka sistem akan men-generate sebuah token yang pembuatan token tersebut berdasarkan userID user yang
telah berhasil login, iat (issued at) berupa tanggal, expired date token, dan secret key. Untuk dapat digunakannya token tersebut
maka dibuatlah middlewares authorization yang digunakan untuk men-decoded token. Middlewares ini yang akan digunakan untuk memberikan
autorisasi pada masing-masing routes yang ada, mana yang akan diberikan autorisasi dan mana yang tidak. Dalam middlewares auth akan
dilakukan dekode dari token yang telah diberikan pada user pada headers authorization, dekode token tersebut menggunakan secret key
yang telah digunakan sebelumnya dan algoritma sehingga token akan berhasil di dekode dengan memuat beberapa data yang telah disebutkan diatas. Data yang dimuat tersebut akan digunakan untuk mengecek current user yang masuk dalam aplikasi. 
Alasan menggunakan keamanan ini adalah dapat membedakan current user nya serta sekuritas yang lebih karena diberikan token yang diacak dengan algoritma tertentu, ditambah juga menggunakan bcrypt compare password user. 
```

## Nomor 4
```
Ada yang kurang dan ada yang keliru. Pada dokumentasi dituliskan response pada tiap-tiap request memuat payload errors, yang 
seharusnya itu tidak dijadikan satu dengan sukses respon, karena sebuah respon error RESTFul API services seharusnya diberikan respon standarisasi respon tersendiri, begitu juga sukses responnya.

Kemudian untuk kekurangannya adalah meta pada masing-masing sukses responnya, yang terdiri atas total datanya dan jumlah halaman. Data tersebut digunakan nantinya oleh frontend dalam hal pagination. 
```
