# Sécure Box

But: trouver des failles de sécurité dans un réseau et les analyser puis produire un rapport d'audit </br>
Plateforme: raspberry pi </br>
OS: raspbian lite </br>
Système: conteneur docker </br>

<ul>
  <li>étape 1: scanner le réseau pour trouver des devices </li>
  <ul>
    <li>faire un scan NMAP du réseau </li>
  </ul>
</ul>

<ul>
  <li>étape 2: scanner les devices pour trouver de potentiel failles de sécurité </li>
  <ul>
    <li>trouver l'os du device </li>
    <li>chercher des potentiel vulnérabilité sur cet OS (CVE) </li>
    <ul>
      <li>trouver la version de l'OS </li>
    </ul>
    <li>trouver les ports ouvert </li>
    <ul>
      <li>trouver le service qui tourne derrière le port </li>
      <li>trouver la version du service </li>
    </ul>
  </ul>
</ul>

<ul>
  <li>étape 3: analyser les failles de sécurité et produire un rapport d'audit (détaillé par hosts) </li>
  <ul>
    <li>créer un projet par rapport </li>
    <ul>
      <li>créer une base de données par projet (bdd sous un docker sur la rpi) </li>
      <li>créer un rapport par host </li>
      <ul>
        <li>créer un rapport par vulnérabilité </li>
      </ul>
    </ul>
    <li>interface web local pour gérer les projets </li>
    <ul>
      <li>visionner les rapports </li>
      <ul>
        <li>visionner les vulnérabilitées </li>
        <li>accès aux CVE avec un lien URL </li>
      </ul>
    </ul>
  </ul>
</ul>


⚠️pour lire les mcd / mld utiliser https://app.diagrams.net/ ⚠️


## First time install

    $> docker-compose up -d
