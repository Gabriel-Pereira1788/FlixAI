export const create = jest.fn();
export const write = jest.fn();

export const data = {create, write};
export const mockUseRealm = (): any => data;
