"use strict";

/**
 * Barchart implementation. This charts belongs to 'Basic' family.
 * It is inherited on 'Basic'.
 */
class Barchart extends Basic {
  
  /**
   * Barchart constructor. It needs (at least) one argument to start: data.
   * Optionally, you can indicate a second argument that includes all the chart options. If you 
   * do not specify this, '_default' object is used by default.
   */
  constructor(){
    super();
    if(!arguments.length){
      throw new Error('Missing constructor parameters');
    }
    
    this._inferDataSource(arguments[0]);

    switch(arguments.length){
      case 1:
        this.data = arguments[0];
        this.config = _default;
        break;
      case 2:
        this.data = arguments[0];
        this.config = arguments[1];
        break;
      default:
        throw Error('Unrecognized number of paremeters: ' + arguments);
    }
    this._svg = new Svg(this.data, this.config);
  }

  /**
   * Renders a data object on the chart.
   * @param  {Object} data This object contains the data that will be rendered on chart. If you do not
   * specify this param, this.data will be used instead.
   */
  draw(data = this.data){
    super.draw(data);
    this._svg.draw(data);
  }

  /**
   * Add new data to the current graph. If it is empty, this creates a new one.
   * @param  {[Object]} datum data to be rendered
   */
  keepDrawing(datum){
    if(!this.datum){
      this.datum = [];
    }
    this.datum = this.datum.concat(datum);
    if(this.datum.length > 50){
      for(var i = 0; i < datum.length; i++){
        this.datum.shift();
      }
    }
    this._svg.draw(this.datum);
  }
}