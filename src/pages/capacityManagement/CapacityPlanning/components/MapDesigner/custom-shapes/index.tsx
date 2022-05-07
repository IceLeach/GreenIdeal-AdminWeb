import type { NsJsonSchemaForm } from '@antv/xflow';
import FormInputNumber from './FormInputNumber';

/** 自定义form控件 */
export enum ControlShapeEnum {
  'INPUTNUMBER' = 'InputNumber',
}

export const controlMapService: NsJsonSchemaForm.IControlMapService = (
  controlMap,
) => {
  controlMap.set(ControlShapeEnum.INPUTNUMBER, FormInputNumber);
  return controlMap;
};
