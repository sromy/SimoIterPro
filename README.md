# SimoIterPro

	- clone del progetto
	- creare il war simoiterpro-backend.war via maven install
	- modificare nel docker-compose-prod.yaml i path relativi alla propria macchina :
		* keycloak		volumes
		* db			volumes
	- copiare file init.sql sotto il path specificato per il db
	- aggiungere nell'etc host 		
		* 127.0.0.1		keycloak
	- lanciare il comando di compilazione
		* docker-compose -f docker-compose-prod.yaml build
	- lanciare il comando per avviare i container
		* docker-compose -f docker-compose-prod.yaml up
	- aprire la console di keycloak dall'url http://localhost:8180/	 con le credenziali admin/admin		
		* importare il realm file "simoiterpro-realm.json
		* creare gli utenti e relative credenziali (tab credentials)
	
	-> aprire l'applicazione http://localhost:9090
	
		