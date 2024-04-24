export interface DataShareService {
  // định nghĩa thành phần lớp service share data memory
  data: DataModal<any>[];
  subriceEvent: DataEventModal[];

  getValue<T = any>(key: string): T;
  setValue<T>(key: string, value: T): void;
  getValueChange<T = any>(key: string, subrice: (value: T) => void): void;
}

export interface DataModal<T> {
  key: string;
  value: T;
}

export interface DataEventModal {
  key: string;
  sub: (value: any) => void;
}
