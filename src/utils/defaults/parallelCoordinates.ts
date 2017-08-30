import * as Colors from '../colors';
import StreamingStrategy from '../../charts/enums/StreamingStrategy';

export const defaults: any = {
    selector: '#chart',
    colorScale: Colors.category8(),
    marginTop: 20,
    marginRight: 20,
    marginBottom: 30,
    marginLeft: 70,
    width: '50%', // %, auto, or numeric
    height: 450,
    legend: false,
    legendPosition: 'right',
    propertyKey: 'key',
    tickLabel: '',
    transitionDuration: 300,
    maxNumberOfElements: 5, // used by keepDrawing to reduce the number of elements in the current chart //TODO
    streamingStrategy: StreamingStrategy.REPLACE,
    onDown(d: any) {
    },
    onHover(d: any) {
    },
    onLeave(d: any) {
    },
    onClick(d: any) {
    },
    onUp(d: any) {
    },
    spinner: false,
    pauseButton: false,
    pauseButtonPosition: 'bottom'
};
