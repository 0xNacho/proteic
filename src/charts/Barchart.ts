import Chart from "./Chart";
import SvgStrategyBarchart from "../svg/strategies/SvgStrategyBarchart";
import {defaults} from "../utils/defaults/barchart";
import {copy, isValuesInObjectKeys} from "../utils/functions";

class Barchart extends Chart {

    constructor(data: any, userConfig: any = {}) {
        super(
            new SvgStrategyBarchart(),
            data,
            userConfig,
            defaults
        );
    }

    fire(event: string, data: string) {//TODO: improve this section
        if (event === 'transition') {
            if (data === 'grouped') {
                this.config.put('stacked', false);
            }
            else if (data === 'stacked') {
                this.config.put('stacked', true);
            }
            this.draw();
        }
    }

    // NOTE: check if the Barchart datum can really be an Object instead of Array
    //
    // public keepDrawing(datum: any) {
    //     let datumType = datum.constructor;
    //     let nullValues = this.config.get('nullValues'),
    //         propertyX = this.config.get('propertyX'),
    //         propertyY = this.config.get('propertyY'),
    //         propertyKey = this.config.get('propertyKey');
        
    //     if (datumType === Array) {
    //         let filteredDatum = datum.filter(isValuesInObjectKeys(nullValues, [propertyX, propertyY, propertyKey]));
    //         this.data = filteredDatum;
    //     }
    //     else {
    //         let found = false;
    //         for (let i = 0; i < this.data.length; i++) {
    //             let d = this.data[i];
    //             if (d[propertyX] === datum[propertyY] && d[propertyKey] === datum[propertyKey]) {
    //                 this.data[i] = datum;
    //                 found = true;
    //                 break;
    //             }
    //         }
    //         if (!found) {
    //             this.data.push(datum);
    //         }
    //     }

    //     this.draw(copy(this.data));
    // }
}

export default Barchart;