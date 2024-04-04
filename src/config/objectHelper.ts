import { IOption } from "../interfaces/IOption";

export interface Item {
  [key: string]: any;
}

class ObjectHelper {
  static getValuesParseToSelect = (
    list: Item[],
    valueName?: string,
    labelName?: string
  ): IOption[] => {
    let options: IOption[] = [];

    valueName = valueName || "id";
    labelName = labelName || "name";
    list = Array.isArray(list) ? list : [];
    list.forEach((item) => {
      if (valueName && labelName)
        options.push({ value: item[valueName], label: item[labelName] });
    });
    return options;
  };
}

export default ObjectHelper;
