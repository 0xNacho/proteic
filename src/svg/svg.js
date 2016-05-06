class SvgChart {

    constructor(chartContext) {
        var clazz = this.constructor.name;
        if (clazz === 'SvgChart') {
            throw new Error(clazz + ' is non-instanciable');
        }
        this._initialized = false;
        this.cType = chartContext.cType;
        this._loadConfigOnContext(chartContext.config);
        
        this.interactiveElements = null;
    }

    draw(data) {
        if (this._sortData) {
            utils.sortBy(data, {
                prop: this._sortData.prop,
                desc: this._sortData.descending
            });
        }

        if (!this._initialized) {
            this._initialize();
        }

    }
  
    _initialize() {
      var width = this.width + this.margin.left + this.margin.right;
      var height = this.height + this.margin.left + this.margin.right;

      //Create a global 'g' (group) element
      this.svg = d3
        .select(this.selector).append('svg')
        .attr({ width, height })
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
      
      //Append a new group with 'x' aXis
      this.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(this.xAxis);

      //Append a new group with 'y' aXis
      this.svg.append('g')
        .attr('class', 'y axis')
        .attr('stroke-dasharray', '5, 5')
        .call(this.yAxis)
        .append('text');

      // Append axes labels
      this.svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'xaxis-label')
        .attr('x', this.width / 2)
        .attr('y', this.height + this.margin.bottom)
        .text(this.xAxisLabel);
      this.svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'yaxis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', - this.height / 2)
        .attr('y', - this.margin.left / 1.3)
        .text(this.yAxisLabel);
    }

    _applyCSS() {
        var style = this.style;
        var styleValue = null;
        
        for (let key in style) {
            styleValue = style[key];
            d3.selectAll(key).style(styleValue);
        }
    }
    
    on(events = {}){
        for(let key in events){
            let action = events[key];
            this.interactiveElements.on(key + '.user', action);
        }
        
    }

    _loadConfigOnContext(config) {
        config = config || { events: {}, markers: {}, xaxis: {}, yaxis: {}};
        if (!config.events) {
            config.events = {};
        }
        if (!config.markers) {
            config.markers = {};
        }
        if (!config.xaxis) {
            config.xaxis = {};
        }
        if (!config.yaxis) {
            config.yaxis = {};
        }
        this.margin = config.margin || _default[this.cType].margin;
        this.width = config.width ||  _default[this.cType].width;
        this.height = config.height ||  _default[this.cType].height;
        this.ticks = config.ticks ||  _default[this.cType].ticks;
        this.tickLabel = config.tickLabel || _default[this.cType].tickLabel;
        this.selector = config.selector || _default[this.cType].selector;
        this.transitionDuration = config.transitionDuration || _default[this.cType].transitionDuration;
        this.tooltip = config.tooltip || _default[this.cType].tooltip;
        this.events = {};
        this.events.down = config.events.down || _default[this.cType].events.down;
        this.events.up = config.events.up || _default[this.cType].events.up;
        this.events.over = config.events.over || _default[this.cType].events.over;
        this.events.click = config.events.click || _default[this.cType].events.click;
        this.events.leave = config.events.leave || _default[this.cType].events.leave;
        this._sortData = config.sortData || _default[this.cType].sortData;
        this.style = config.style || _default[this.cType].style;
        this.colorScale = config.colorScale || _default[this.cType].colorScale;
        this.xAxisLabel = config.xaxis.label || _default[this.cType].xaxis.label;
        this.yAxisLabel = config.yaxis.label || _default[this.cType].yaxis.label;
    }
}