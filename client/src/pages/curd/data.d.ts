export type NormalFieldsType = 'string' | 'number' | 'boolean';

export type SpectialFieldsType = 'array' | 'object';

export type FieldsType = SpectialFieldsType | NormalFieldsType;

export interface CommonFieldsValue {
  name?: string;
}

export interface NormalFieldsValue extends CommonFieldsValue {
  type: NormalFieldsType;
}


export interface SpectialFieldsValue extends CommonFieldsValue {
  type: SpectialFieldsType;
  children: Fields;
}

export interface Fields {
  [propName: string]: SpectialFieldsType | NormalFieldsType;
}
