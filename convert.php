<?php
$data = json_decode(file_get_contents("old.artifacts.json"));

$result = [];

foreach ($data as $key => $artifact) {
    $c = new stdClass();
    $c->title = $artifact->title;
    $c->artifacts = [];
    foreach ($artifact->fragments as $key => $fragment) {
        $a = new stdClass();
        $a->title = $fragment->type;
        $a->snippet = $fragment->code;
        array_push($c->artifacts, $a);
    }
    array_push($result, $c);
}

file_put_contents("artifacts.json", json_encode($result));