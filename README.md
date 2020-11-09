# SimoIterPro

1. clone del progetto
	
2. dal modulo java **simoiterpro-backend** generare il war **simoiterpro-backend.war** via maven install
	
3. modificare nel **docker-compose-prod.yaml** i path relativi alla propria macchina :
	- keycloak		volumes
	- db			volumes
		
4. copiare file **init.sql** sotto il path specificato per il db
	
5. aggiungere nell'etc host 		
	- 127.0.0.1		keycloak
		
6. lanciare il comando di compilazione
	
	docker-compose -f docker-compose-prod.yaml build

		
7. lanciare il comando per avviare i container
	
	docker-compose -f docker-compose-prod.yaml up
		
8. aprire la Administration Console di keycloak dall'url **http://localhost:8080/**	 con le credenziali admin/admin		
	- importare il realm file **simoiterpro-realm.json**
	- nel realm appena importato creare gli utenti e relative credenziali (tab credentials)
	
-> aprire l'applicazione **http://localhost:9090**
	
		
