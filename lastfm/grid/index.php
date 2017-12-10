<!DOCTYPE html>
<head>
  <title>lastfm grid - zachhuxford.io</title>
  <meta charset="UTF-8">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript">
    var currentUser = <?php
        if (isset($_GET["username"])) {
          echo json_encode($_GET["username"]);
        } else {
          echo json_encode("zachbwh");
        }
        ?>;
    var gridSquareWidth = <?php
        if (isset($_GET["gridwidth"])) {
          echo json_encode(100 / $_GET["gridwidth"]);
        } else {
          echo json_encode("10");
        }
        ?> + "%";

    var gridSquareHeight = <?php
        if (isset($_GET["gridwidth"])) {
          echo json_encode(200 / $_GET["gridwidth"]);
        } else {
          echo json_encode("20");
        }
        ?> + "%";

    var numberOfResults = <?php
        if (isset($_GET["gridwidth"]) && isset($_GET["gridheight"])) {
          echo json_encode($_GET["gridwidth"] * $_GET["gridheight"]);
        } else {
          echo json_encode("50");
        }
      ?>;

      // Must be either 0, 1, 2, 3
    var imageSize = <?php
        if (isset($_GET["imagesize"])){
          echo json_encode($_GET["imagesize"]);
        } else {
          echo json_encode("2");
        }
      ?>;
  </script>
  <script src="./grid.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/res/w3.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
    .col {
      float: left;
      width: 175px;
    }

    div#albums {
      width: 100vw;
      height: 50vw;
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
    }
    div#parentdiv {
      text-align: center;
    }
  </style>

<!-- Global Site Tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-107350487-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());

  gtag('config', 'UA-107350487-1');
</script>
</head>

<html>
<style>
  body {
    margin: 0px;
  }
</style>
<body>
<div id="parentDiv" class="">
  <div id="albums" class="">
  </div>
</div>
</body>
</html>
