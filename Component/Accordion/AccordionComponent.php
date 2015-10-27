<?php

namespace XVEngine\Bundle\AccordionBundle\Component\Accordion;

use XVEngine\Core\Component\AbstractComponent;

class AccordionComponent extends AbstractComponent {


    public $items = [];

    public function initialize() {
        $this->setComponentName('tab.accordinComponent');
        $this->setParamByRef("items", $this->items);
    }


    /**
     * @param AccordionComponentItem $tab
     * @return $this
     */
    public function addItem(AccordionComponentItem $tab) {
        $this->items[] = $tab;
        return $this;
    }


    /**
     * @param string $value
     * @return $this
     */
    public function setActive($value) {
        $this->setParam("active", $value);
        return $this;
    }



    
}