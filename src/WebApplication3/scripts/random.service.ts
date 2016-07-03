import {Injectable} from '@angular/core';

@Injectable()
export class RandomService {
    private values: number[] = [];

    getRandom() {
        var rnd = Math.random();
        this.values.push(rnd);
        return rnd;
    }

    getGaussian(mean, stdev) {
        var y2;
        var use_last = false;
        return function () {
            var y1;
            if (use_last) {
                y1 = y2;
                use_last = false;
            }
            else {
                var x1, x2, w;
                do {
                    x1 = 2.0 * Math.random() - 1.0;
                    x2 = 2.0 * Math.random() - 1.0;
                    w = x1 * x1 + x2 * x2;
                } while (w >= 1.0);
                w = Math.sqrt((-2.0 * Math.log(w)) / w);
                y1 = x1 * w;
                y2 = x2 * w;
                use_last = true;
            }

            var retval = mean + stdev * y1;
            if (retval > 0)
                return retval;
            return -retval;
        }
    }

    getValues() {
        return this.values;
    }

    fillImageData(pixelData: ImageData): ImageData {
        var first: number = 0, second: number = 0, third: number = 0, forth: number = 0;
        var max = 0;
        var stopCondition = this.values.length - 100 < 0 ? 0 : this.values.length - 100;
        for (var i = this.values.length - 1; i > stopCondition; i--) {
            var val = this.values[i];
            if (val < .25) {
                first++;
                if (first > max) max = first;
            }
            else if (val < .5) {
                second++;
                if (second > max) max = second;
            }
            else if (val < .75) {
                third++;
                if (third > max) max = third;
            }
            else {
                forth++;
                if (forth > max) max = forth;
            }
        }

        var pixelPos = 0;
        var isFilled:boolean;
        for (var y = 0; y < pixelData.height; y++) {
            for (var x = 0; x < pixelData.width; x++) {
                isFilled = false;
                if (x / pixelData.width < .25 && y / pixelData.height < first / max) {
                    isFilled = true;
                }
                if (x / pixelData.width >= .25 && x / pixelData.width < .5 && y / pixelData.height < second / max) {
                    isFilled = true;
                }
                if (x / pixelData.width >= .5 && x / pixelData.width < .75 && y / pixelData.height < third / max) {
                    isFilled = true;
                }
                if (x / pixelData.width >= .75 && y / pixelData.height < forth / max) {
                    isFilled = true;
                }
                if (isFilled) {
                    pixelData.data[pixelPos++] = 0;
                    pixelData.data[pixelPos++] = 0;
                    pixelData.data[pixelPos++] = 255;
                    pixelData.data[pixelPos++] = 255;
                }
                else {
                    pixelPos += 4;
                }
            }
        }

        return pixelData;
    }
}