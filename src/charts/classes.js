'use strict';
/* globals Svg, _default */

/**
 * Base class. This class is inherited in all charts implementations.
 * This is a non-instanciable chart.
 */
class Chart {

  constructor() {
    if (new.target === Chart || new.target === Basic || new.target === Flow) {
      throw new Error(new.target + ' is non-instanciable');
    }
  }
  
  /**
   * Returns the chart context: data, configuration and chart type.
   */
  _getChartContext() {
    return {
      data: this.data,
      config: this.config,
      cType: this.constructor.name
    }
  }

  /**
   * Initialize the SVG context
   */
  _initializeSVGContext() {
    this._svg = new SvgStrategy(strategies[this.constructor.name](this._getChartContext()));
  }
  /**
   * @param  {Object} data Data object. This method infer the type of data, which could be:
   * Array: Data is an static object.
   * Object: Data is a data source we need to connect to, in order to receive a stream of data.
   */
  _inferDataSource(data) {
    if (utils.isObject(data)) {
      this._initializeWebsocketDataSource(data);
    } else if (!utils.isArray(data)) {
      throw new TypeError('Wrong data format');
    }
  }

  /**
   * Initialize a connecton between browser and server through a Websocket connections
   * @param  {Object} source Connection details.
   */
  _initializeWebsocketDataSource(source) {
    this.ws = new WebSocket(source.endpoint);
    
    this.ws.onopen = () => {
    };

    this.ws.onerror = (e) => {
      throw new Error('Error with websocket connection', e);
    };

    this.ws.onmessage = (event) => {
      var data = JSON.parse(event.data).points;
      setTimeout(() => {
        this.keepDrawing(data);
      }, 50);
    };
  }

  /**
   * Renders data on barchart. Only allowed when data is an array of static data.
   * @param  {Array} data Array of data
   */
  draw(data = this.data) {
    if (!utils.isArray(data)) {
      throw new TypeError('draw method is only allowed with static data.');
    }
    this._svg.draw(data);
  }

  /**
   * Returns a PNG image of the current graph
   * @return {[String]} Image in data-url format
   */
  toPNG(cb) {
    console.log(this);
    utils.svgAsDataUri(d3.select(this.config.selector + ' svg')[0][0], {}, (uri, err) => {
      if (err) {
        throw Error('Error converting to image ' + err);
      }
      else {
        cb(uri);
      }
    });
  }

  /**
   * on event
   */
  on(eventName, action) {
    console.log(eventName, action);
  }

}




/**
 * Basic chart. This class in inherited in all basic charts implementatios.
 * This is a non-instanciable chart. Instanciable charts are: bar, line, point.
 */

class Basic extends Chart {
  constructor() {
    super();
  }
}

/**
 * Flow chart. This class in inherited in all basic charts implementatios.
 * This is a non-instanciable chart. Instanciable charts are: stremgraph and so on.
 */

class Flow extends Chart {
  constructor() {
    super();
  }
}
