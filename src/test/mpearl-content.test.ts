import { describe, expect, it } from "vitest";

import { healthPackages, imagingServices, labInvestigations, signaturePackages } from "@/lib/mpearl-content";

describe("Mpearl public service content", () => {
  it("includes the investigations, scans, and packages from the supplied lists", () => {
    expect(labInvestigations).toHaveLength(66);
    expect(imagingServices).toHaveLength(16);
    expect(healthPackages).toHaveLength(15);
    expect(signaturePackages).toHaveLength(3);
  });

  it("keeps changing prices out of all public service and package content", () => {
    const publicItems = [...labInvestigations, ...imagingServices, ...healthPackages, ...signaturePackages];

    expect(publicItems.some((item) => "price" in item)).toBe(false);
  });
});