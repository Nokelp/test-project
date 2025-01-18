import type { InfoData } from '../../../types';

export const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

export const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export interface Values {
  username: string;
  sex: string;
  age: number;
  email: string;
}

export interface ChildComponentProps {
  desc: InfoData;
  UpdateDesc: React.Dispatch<React.SetStateAction<InfoData>>;
}