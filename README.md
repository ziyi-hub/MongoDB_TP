# mongodb_WANG_OLIVIA

<h1>Équipes du groupe(LP2)</h1>
<ol>
    <li>Tania OLIVIA</li>
    <li>Ziyi WANG</li>
</ol>


<h1>Consignes d'installation</h1>

<ol>
  <li>Arrêtez XAMPP/WAMP/LAMP/MAMP, si vous avez déjà lancé</li>
  <li>Vous pouvez cloner ssh dans n'importe quel répertoire de votre choix, mais pas dans le répertoire XAMPP/LAMP/WAMP/MAMP</li>
  <li>Lancez le service docker</li>
  <li>Dans le répertoire de "src", il faut que vous exécutez la commande <code>composer install</code>
    Puis, déplacez-vous dans le répertoire "mongodb_WANG_OLIVIA" et tapez la commande <code>docker-compose up --build</code> sur terminal</li>
  
  <li>
    Afin de visualiser la base de données, vous devez vous connecter sur Mongo Express <code>http://localhost:8081</code> avec les identifiants suivants :<br>
    <ul>Utilisateur: mongo</ul>
    <ul>Mot de passe: mongopass</ul>
  </li>
  
  <li>Lancez l'application sur navigateur <code>http://localhost:12080</code></li>
  <li>Vous pouvez maitenant profiter de l'application</li>
</ol>


<h1>Consignes de test du projet</h1>
<ol><li>Afin de tester le projet, d'abord vous devez vous déplacer dans le répertoire "src" et puis tapez cette commande <code>vendor/bin/phpunit --color tests/tests/mongoTest.php</code></li></ol>


<h1>Lien utiles</h1>
<address>
    <p><a href="https://github.com/ziyi-hub/mongodb_WANG_OLIVIA">Lien Github</a></p>
</address>


