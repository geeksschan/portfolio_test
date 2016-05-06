<?php

use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as FileAdapter;

class TestController  extends ControllerBase
{
    public function initialize() {

    }

    public function indexAction()
    {
        $this->view->setMainView('test');
        $this->assets->addCss("assets/css/test.css");
        $this->assets->addJs("assets/js/test.js");
    }

}