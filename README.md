Uruchamianie:
1. Najpierw skompilować front.
W folderze frontend w konsoli:

npm run build

2. Potem zbudować przez dockera i uruchomić kontenery.
W folderze głównym projektu w konsoli:
 
docker-compose build --no-cache

docker-compose up

3. Otworzyć albo poprzez http://localhost/ albo w dockerze kliknąć w port 80:80 
