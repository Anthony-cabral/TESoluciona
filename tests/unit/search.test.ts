import { describe, expect, it } from "vitest";

import { searchContent } from "@/features/solutions/search";

describe("solution search", () => {
  it("finds articles by title and keywords", () => {
    const search = searchContent("Windows activado");

    expect(search.total).toBeGreaterThan(0);
    expect(search.results[0]?.url).toBe(
      "/articulos/como-comprobar-si-windows-esta-activado"
    );
  });

  it("prioritizes exact error codes", () => {
    const search = searchContent("0x80070005");

    expect(search.results[0]).toEqual(
      expect.objectContaining({
        type: "error",
        url: "/errores/windows/0x80070005"
      })
    );
  });

  it("supports basic typo tolerance", () => {
    const search = searchContent("Windws activado");

    expect(
      search.results.some((result) => result.title.includes("Windows"))
    ).toBe(true);
  });

  it("finds guide content by commands and step explanations", () => {
    const search = searchContent("slmgr xpr activacion permanente");

    expect(
      search.results.some((result) =>
        result.url.includes("como-consultar-el-estado-con-slmgr-xpr")
      )
    ).toBe(true);
  });

  it("finds activation errors from legitimate support content", () => {
    const search = searchContent("0xC004F213 clave producto");

    expect(search.results[0]?.url).toBe("/errores/windows/0xc004f213");
  });

  it("filters by type and category", () => {
    const search = searchContent("JSON", {
      categorySlug: "sql",
      type: "tool"
    });

    expect(search.results).toHaveLength(1);
    expect(search.results[0]?.url).toBe("/herramientas/json-formatter");
  });
});
