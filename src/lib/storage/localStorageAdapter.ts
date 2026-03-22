export interface StorageAdapter {
  read(key: string): string | null;
  write(key: string, value: string): void;
  remove(key: string): void;
}

export const localStorageAdapter: StorageAdapter = {
  read(key: string): string | null {
    return window.localStorage.getItem(key);
  },
  write(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  },
  remove(key: string): void {
    window.localStorage.removeItem(key);
  },
};