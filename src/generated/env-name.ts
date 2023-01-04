export const AllProjectEnvNames = [
  'PHASE_DEV_NAME',
  'ENV_TEST_NUMBER',
  'ENV_TEST_JSON',
  'DIRENV_WATCHES',
  'ENV_TEXT_BOOLEAN',
  'PATH',
  'NX_WORKSPACE_ROOT',
  'ENV_TEST_STRING',
] as const;
export type ProjectEnvName = typeof AllProjectEnvNames[number];

