// dealare
declare global {
  interface String {
    convertToISOTime(this: string): string;
    convertToDate(this: string): Date;
    convertYYYYMMDDToDate(this: string): Date;
    convertLongToDate(this: string): Date;
    toUnSign(this: string, toUper: boolean): string;
    isNotEmpty(this: string): boolean;
    stringDateVItoStringYYYYMMDD(this: string): string;
    toJsonArray(this: string, defaultValue: any): any;
    convertYYYYMMDDToString(this: string): string;
    removeAccents(this: string): string;
    convertJavaToDate(this: string): Date;
  }

  interface Number {
    convertYYYYMMDDToDate(this: Number): Date | null;
    convertYYYYMMDDHHmmssToDate(this: Number): Date | null;
    convertIntegerToDate(this: Number): Date | null;
    toFixedAndClear(fractionDigits: number | undefined): string;
    toRomanNumeral(this: Number): string | null;
  }

  interface Date {
    toNumberYYYYMMDD(this: Date): Number | null;
    toNumberYYYYMMDDHHmmss(this: Date): Number | null;
    toStringShortDate(this: Date): string;
  }
}

declare module "react-reactive-form" {
  interface FormGroup {
    markAllAsTouched(this: FormGroup): void;
    markAllUnAsTouched(this: FormGroup): void;
  }
}

export {};
