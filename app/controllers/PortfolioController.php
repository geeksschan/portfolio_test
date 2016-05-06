<?php

class PortfolioController  extends ControllerBase
{
    public function initialize() {

        parent::initialize();
        $this->assets->addCss("assets/css/default.css");
        $this->view->setVar("list_category", "portfolio");
    }

    public function tuttoroomAction() {
        $this->view->setVar("category_name", "tuttoroom");
    }

    public function bookkAction() {
        $this->view->setVar("category_name", "bookk");
    }

    public function theHookAction() {
        $this->view->setVar("category_name", "thehook");
    }

    public function laughingbeanAction() {
        $this->view->setVar("category_name", "laughingbean");
    }

    public function ipoptvAction() {
        $this->view->setVar("category_name", "ipoptv");
    }

    public function moruwaAction() {
        $this->view->setVar("category_name", "moruwa");
    }

    public function peoplefundAction() {
        $this->view->setVar("category_name", "peoplefund");
    }

    public function postypeAction() {
        $this->view->setVar("category_name", "postype");
    }

    public function bookclipAction() {
        $this->view->setVar("category_name", "bookclip");
    }

    public function sschanAction() {
        $this->view->setVar("category_name", "sschan");
    }

}