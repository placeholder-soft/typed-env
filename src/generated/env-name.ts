export const AllProjectEnvNames = {
  NX_WORKSPACE_ROOT: 'NX_WORKSPACE_ROOT',
  PATH: 'PATH',
} as const;
export type ProjectEnvName = keyof typeof AllProjectEnvNames;

