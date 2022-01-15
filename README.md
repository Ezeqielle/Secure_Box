# Sécure Box

But: trouver des failles de sécurité dans un réseau et les analyser puis produire un rapport d'audit </br>
Plateforme: raspberry pi </br>
OS: raspbian lite </br>
Système: conteneur docker </br>

étape 1: scanner le réseau pour trouver des devices </br>
    - faire un scan NMAP du réseau </br>

étape 2: scanner les devices pour trouver de potentiel failles de sécurité </br>
    - trouver l'os du device </br>
    - chercher des potentiel vulnérabilité sur cet OS (CVE) </br>
      - trouver la version de l'OS </br>
    - trouver les ports ouvert </br>
      - trouver le service qui tourne derrière le port </br>
        - trouver la version du service </br>

étape 3: analyser les failles de sécurité et produire un rapport d'audit (détaillé par hosts) </br>
    - créer un projet par rapport </br>
      - créer une base de données par projet (bdd sous un docker sur la rpi) </br>
      - créer un rapport par host </br>
        - créer un rapport par vulnérabilité </br>
    - interface web local pour gérer les projets </br>
      - visionner les rapports </br>
        - visionner les vulnérabilitées </br>
        - accès aux CVE avec un lien URL </br>
