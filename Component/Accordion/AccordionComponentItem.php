<?php

namespace XVEngine\Bundle\AccordionBundle\Component\Accordion;

use JsonSerializable;
use XVEngine\Core\Component\AbstractComponent;


class AccordionComponentItem implements JsonSerializable {


    private $id;

    /**
     *
     * @var string
     */
    private $label;

    /**
     *
     * @var AbstractComponent
     */
    private $component;


    /**
     *
     * @param string $id
     * @param string $label
     */
    public function __construct($id, $label, $component = null) {
        $this->setID($id);
        $this->setLabel($label);

        if($component){
            $this->setComponent($component);
        }
    }



    public function setLabel($value){
        $this->label = $value;
        return $this;
    }

    /**
     *
     * @param string $value
     * @return TabComponentItem
     */
    public function setID($value){
        $this->id = $value;
        return $this;
    }



    public function setComponent(AbstractComponent $component){
        $this->component = $component;
        return $this;
    }

    /**
     *
     * @return string[]
     */
    public function jsonSerialize() {
        return array(
            "id" => $this->id,
            "label" => $this->label,
            "component" => $this->component
        );
    }

}