<?php

use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as FileAdapter;

class IndexController  extends ControllerBase
{
    public function initialize() {

        parent::initialize();
        $this->assets->addCss("assets/css/main.css");
        $this->assets->addCss("assets/css/sc-carousel.css");

        $this->assets->addJs("assets/js/sc-carousel.js");
        $this->assets->addJs("assets/js/main.js");
    }

    public function indexAction()
    {
        $this->view->setVar("list_category", "main");
    }

    public function practiceAction() {

    }

    public function testAction() {
        $this->view->setMainView('test');
        $this->assets->addCss("assets/css/test.css");
        $this->assets->addJs("assets/js/test.js");
    }

}