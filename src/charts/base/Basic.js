'use strict';

/**
 * Basic chart. This class in inherited in all basic charts implementatios.
 * This is a non-instanciable chart. Instanciable charts are: bar, line, point.
 */

class Basic extends Chart {
  constructor(data, config) {
    super(data, config);
  }

  keepDrawing(datum, mode) {
    let config = this.config;
    let maxNumberOfElements = config.maxNumberOfElements;
    var d = null;

    if (!datum) {
      console.warn('attemp to draw null datum');
      return;
    }

    for (let i in datum) {
      d = datum[i];

      //Find serie or initialize this.
      let serie = utils.findElement(this.data, 'key', d.key);
      if (!serie || !serie.values) {
        serie = {
          key: d.key,
          values: []
        };
        this.data.push(serie);
      }

      this._addByMode(serie, d, mode);
    }
    
    //Loop series and check the maxNumberOfElements
    for(let i in this.data){
      let serie = this.data[i];
      while(serie.values.length > maxNumberOfElements){
        serie.values.splice(0,1);
      }
    }


    this.draw(this.data);
  }

  /**
   * Add data to a serie depending on its mode (add or replace)
   */
  _addByMode(serie, d, mode) {
    if (mode === 'add') {
      serie.values = serie.values.concat(d.values);
    }
    else if (mode === 'replace') {
      serie.values = d.values;
    }
    else {
      throw Error('Unknow keepDrawing mode:  ' + mode);
    }
  }
}