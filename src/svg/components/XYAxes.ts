import XAxis from './XAxis';
import YAxis from './YAxis';

import Config from '../../Config';
import Component from './Component';

class XYAxis extends Component {
    private _x: XAxis;
    private _y: YAxis;

    constructor() {
        super();

        this._x = new XAxis();
        this._y = new YAxis();
    }

    public render(): void {
        this._x.render();
        this._y.render();

    }

    public update(data): void {
        this._x.update(data);
        this._y.update(data);
    }
    
    
    public configure(config: Config, svg: any){
        super.configure(config, svg);
        this._x.configure(config, svg);
        this._y.configure(config, svg);
    }

    get x(): XAxis {
        return this._x;
    }

    get y(): YAxis {
        return this._y;
    }


}

export default XYAxis;