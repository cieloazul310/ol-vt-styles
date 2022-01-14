import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { zIndex, palette } from '../../utils';

export default function coastlineStyle() {
  return new Style({
    stroke: new Stroke({
      color: palette.coastline,
    }),
    zIndex: zIndex.coastline,
  });
}
