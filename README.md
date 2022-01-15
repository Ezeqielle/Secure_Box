# Sécure Box

But: trouver des failles de sécurité dans un réseau et les analyser puis produire un rapport d'audit
Plateforme: raspberry pi
OS: raspbian lite
Système: conteneur docker

étape 1: scanner le réseau pour trouver des devices
    - faire un scan NMAP du réseau

étape 2: scanner les devices pour trouver de potentiel failles de sécurité
    - trouver l'os du device
    - chercher des potentiel vulnérabilité sur cet OS (CVE)
      - trouver la version de l'OS
    - trouver les ports ouvert
      - trouver le service qui tourne derrière le port
        - trouver la version du service

étape 3: analyser les failles de sécurité et produire un rapport d'audit (détaillé par hosts)
    - créer un projet par rapport
      - créer une base de données par projet (bdd sous un docker sur la rpi)
      - créer un rapport par host
        - créer un rapport par vulnérabilité
    - interface web local pour gérer les projets
      - visionner les rapports
        - visionner les vulnérabilitées
        - accès aux CVE avec un lien URL
