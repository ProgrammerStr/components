<?php 

    /* NOME DA PASTA */
    $pastaRoot = 'vc-LevaTudo/';

    mkdir('../../web_resources/'.$pastaRoot);
    mkdir('../../web_resources/'.$pastaRoot.'/js');
    mkdir('../../web_resources/'.$pastaRoot.'/sass');
    mkdir('../../web_resources/'.$pastaRoot.'/sass/src');
    mkdir('../../web_resources/'.$pastaRoot.'/sass/dest');
    mkdir('../../web_resources/'.$pastaRoot.'/templates');
    mkdir('../'.$pastaRoot);

    echo('dir crate success');

?>