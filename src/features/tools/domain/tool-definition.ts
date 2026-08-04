export const toolStatuses = ["planned", "beta", "active", "disabled"] as const;

export type ToolStatus = (typeof toolStatuses)[number];

export type ToolDefinition = {
  name: string;
  slug: string;
  category: string;
  status: ToolStatus;
};
