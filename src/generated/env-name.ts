export const AllProjectEnvNames = {
  PATH: 'PATH',
  NX_WORKSPACE_ROOT: 'NX_WORKSPACE_ROOT',
} as const;
export type ProjectEnvName = keyof typeof AllProjectEnvNames;

