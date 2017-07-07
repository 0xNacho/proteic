import { 
    area,
    Area,
    CurveFactory,
    nest
} from 'd3';
import Globals from '../../Globals';
import Component from './Component';
import XAxis from './XAxis';
import YAxis from './YAxis';

class Areaset extends Component {

    private x: XAxis;
    private y: YAxis;
    private areaGenerator: Area<any>;

    constructor(x: XAxis, y: YAxis) {
        super();
        this.x = x;
        this.y = y;
    }

    public render() {
        let height = this.config.get('height');
        let propertyX = this.config.get('propertyX');
        let propertyY = this.config.get('propertyY');
        let curve: CurveFactory = this.config.get('curve');

        this.areaGenerator = area()
            .curve(curve)

            .x((d: any) => this.x.xAxis.scale()(d[propertyX]))
            .y0(height)
            .y1((d: any) => this.y.yAxis.scale()(d[propertyY]));
    }

    public update(data: [any]) {
        let propertyKey = this.config.get('propertyKey');
        let dataSeries = nest().key((d: any) => d[propertyKey]).entries(data);
        let areas = this.svg.selectAll(`.${Globals.SELECTOR_ELEMENT}`);
        let colorScale = this.config.get('colorScale');
        let height = this.config.get('height');
        let areaOpacity = this.config.get('areaOpacity');

        areas = areas.data(dataSeries, (d: any) => d[propertyKey])
            .enter()
            .append('g')
            .attr('class', Globals.SELECTOR_ELEMENT)
            .attr(Globals.COMPONENT_DATA_KEY_ATTRIBUTE, (d: any) => d[propertyKey])
            .append('svg:path')
            .attr('data-proteic-element', 'area')
            .style('fill', (d: any) => colorScale(d[propertyKey]))
            .style('fill-opacity', areaOpacity)
            .attr('d', (d: any) => this.areaGenerator(d.values));
    }

    public transition() {
        // console.warn('No transition implementation for areas');
    }

    public clear() {
        this.svg.selectAll(`*[data-proteic-element='area']`).remove();
    }

}

export default Areaset;
