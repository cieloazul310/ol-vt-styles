import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import { FeatureLike } from 'ol/Feature';
import { isNumber, isString, dspPosToPosition } from '../../utils';
import labelOrder from './labelOrder';

export default function labelStyle(feature: FeatureLike) {
  const { ftCode, knj, dspPos, annoCtg, arrng, arrngAgl } =
    feature.getProperties();
  if (!isNumber(ftCode)) throw new Error();
  if (!isNumber(annoCtg)) throw new Error();
  if (!isString(knj)) throw new Error();
  // console.log(arrng, arrngAgl);

  if (annoCtg > 799) {
    /*
    return new Style({
      image: new Circle({ radius: 4, fill: new Fill({ color: '#f00' }) }),
    });
    */
    return new Style();
  }

  const position = dspPosToPosition(dspPos);

  const color = [110, 120, 130, 140, 210, 220].includes(annoCtg)
    ? '#333'
    : [321, 322, 323, 344, 345, 347, 348].includes(annoCtg)
    ? '#77d'
    : [311, 312, 314, 315, 316, 331, 332, 333].includes(annoCtg)
    ? '#744'
    : [411, 412, 421, 422].includes(annoCtg)
    ? '#7a7'
    : '#777';
  const fontSize = [110, 140, 333].includes(annoCtg)
    ? 18
    : [344, 345, 411, 421].includes(annoCtg)
    ? 14
    : 12;
  const stroke = [110, 120, 140, 333, 411, 421, 422].includes(annoCtg)
    ? new Stroke({ color: '#fff', width: 4 })
    : undefined;

  return new Style({
    text: new Text({
      text: knj,
      fill: new Fill({ color }),
      font: `${fontSize}px sans-serif`,
      stroke,
      ...position,
    }),
    zIndex: labelOrder(annoCtg),
  });
}
