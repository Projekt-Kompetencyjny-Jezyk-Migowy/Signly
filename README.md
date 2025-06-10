Uruchamianie:
1. Najpierw skompilować front.
W folderze frontend w konsoli:

npm install

npm install react-router-dom

npm run build

2. Potem zbudować przez dockera i uruchomić kontenery.
W folderze głównym projektu w konsoli:
 
docker-compose build --no-cache

docker-compose up

3. Otworzyć albo poprzez http://localhost/ albo w dockerze kliknąć w port 80:80 

Kopiowanie bazy danych z kontenera:

docker cp signly-backend-1:/app/db.sqlite3 ./db_from_container.sqlite3
