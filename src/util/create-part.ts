type PartFunction = (input: string) => Promise<string> | string;

export const createPart = (fn: PartFunction) => fn;
