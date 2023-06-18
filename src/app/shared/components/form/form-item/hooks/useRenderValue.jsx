import { Form } from 'antd';

import { FORM_ITEM_TYPES } from '~components/form/constant';
import { DATE_DISPLAY } from '~constant/date';
import arrayHelper from '~utils/arrayHelper';

function useRenderValue(name, customRender, type, options) {
  const form = Form.useFormInstance();
  const get = (nameToGet) => form.getFieldValue(nameToGet) || '';
  const value = typeof name === 'string' ? get(name) : form.getFieldsValue(name);

  if (!value) return '';

  if (!customRender) {
    let rsDefault = '';
    switch (type) {
      case FORM_ITEM_TYPES.SELECT:
      case FORM_ITEM_TYPES.RADIO:
        rsDefault = arrayHelper.getLabel(value, options);
        break;
      case FORM_ITEM_TYPES.CHECKBOX: {
        const listLabel = value?.map((e) => arrayHelper.getLabel(e, options));
        rsDefault = listLabel?.join('、');
        break;
      }
      case FORM_ITEM_TYPES.DATEPICKER: {
        rsDefault = value?.format(DATE_DISPLAY);
        break;
      }
      case FORM_ITEM_TYPES.RANGE_DATE: {
        const date1 = value?.[name[0]]?.format(DATE_DISPLAY) || '';
        const date2 = value?.[name[1]]?.format(DATE_DISPLAY) || '';
        rsDefault = `${date1}~${date2}`;
        break;
      }
      default:
        rsDefault = value;
        break;
    }
    return rsDefault;
  }
  return customRender?.(value, get);
}

export default useRenderValue;
