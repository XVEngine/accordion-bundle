(function(namespace, app, globals) {


    namespace.accordionComponent = app.newClass({
        extend: function () {
            return app.core.component.abstractComponent;
        }
    });
    
    


    /**
     * 
     * @returns {$}
     */
    namespace.accordionComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                    <xv-accordion>
                    </xv-accordion>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };


    /**
     *
     * @returns {$}
     */
    namespace.accordionComponent.prototype.getItemTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                    <aside>
                        <a href="">
                            <h3></h3>
                            <i class="icon icon-menu"></i>
                            <i class="icon icon-slide-up"></i>
                        </a>
                        <section></section>
                    </aside>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };


    /**
     * 
     * @returns {object}
     */
    namespace.accordionComponent.prototype.getDefaultParams = function() {
        return {
            items : [],
            active : null
        };
    };

  
    /**
     * 
     * @returns {undefined}
     */
    namespace.accordionComponent.prototype.init = function() {
        var self = this;
        this.setItems(this.params.items).then(function(){
            self.setActive(self.params.active);
        });


        this.initEvents();
    };

    /**
     *
     * @returns {namespace.accordionComponent}
     */
    namespace.accordionComponent.prototype.clear = function() {
        this.$element.html("");
        return this;
    };


    /**
     *
     * @param items
     * @returns {namespace.accordionComponent}
     */
    namespace.accordionComponent.prototype.setItems = function(items) {
        var self = this;
        this.clear();
        var worker = app.utils.getResolved();

        items.forEach(function(item){
            worker = worker.then(function(){
                return self.addItem(item);
            });
        });

        return worker;
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.accordionComponent.prototype.addItem = function(item) {
        var self = this;
        var $item = this.getItemTemplate();

        $item.find("> a > h3 ").html(item.label);
        $item.attr("item-id" , item.id);

        return app.utils.buildComponent(item.component).then(function($html){
            $item.find(" > section").html($html);
            self.$element.append($item);
            self.refreshCountElements();
            return true;
        });
    };

    /**
     *
     * @returns {undefined}
     */
    namespace.accordionComponent.prototype.initEvents = function() {
        var self = this;
        this.$element.on("click", " > aside > a ", function(){
            var $item = $(this).parent();
            self.setActive($item.is(".active") ? null : $item.attr("item-id"));
            self.trigger("onChange");
            return false;
        })
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.accordionComponent.prototype.setActive = function(id) {
        var self = this;
        var $items = this.$element.find("> aside");
        $items.removeClass("active");

        $items.filter(function(){
            return $(this).attr("item-id") == id
        }).addClass("active");

        return true;
    };

    /**
     *
     * @returns {undefined}
     */
    namespace.accordionComponent.prototype.refreshCountElements = function(id) {
        var count = this.$element.find("> aside").length;

        this.$element.alterClass('count-*', 'count-'+count);

        return true;
    };

    
    return namespace.accordionComponent;
})(__ARGUMENT_LIST__);