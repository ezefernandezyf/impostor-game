import { describe, expect, it, vi } from "vitest";
import { localStorageAdapter } from "../localStorageAdapter";

describe("localStorageAdapter", () => {
  it("reads, writes, and removes values through window.localStorage", () => {
    const localStorageSpy = {
      getItem: vi.spyOn(window.localStorage.__proto__, "getItem"),
      setItem: vi.spyOn(window.localStorage.__proto__, "setItem"),
      removeItem: vi.spyOn(window.localStorage.__proto__, "removeItem"),
    };

    localStorageAdapter.write("impostor:test", "value");
    expect(localStorageAdapter.read("impostor:test")).toBe("value");
    localStorageAdapter.remove("impostor:test");
    expect(localStorageAdapter.read("impostor:test")).toBeNull();

    expect(localStorageSpy.setItem).toHaveBeenCalledWith("impostor:test", "value");
    expect(localStorageSpy.getItem).toHaveBeenCalledWith("impostor:test");
    expect(localStorageSpy.removeItem).toHaveBeenCalledWith("impostor:test");
  });
});
