export type ActionType =
  | 'file_create'
  | 'file_modify'
  | 'file_delete'
  | 'folder_create'
  | 'code_analysis'
  | 'tool_execute';

// this above type says which tools we have to execute

export type ActionStatus = 'pending' | 'executed' | 'approved' | 'rejected';

export interface ActionLog {
  id: string;
  timestamp: Date;
  type: ActionType;
  path: string;
  details: {
    before?: string;
    after?: string;
    toolName?: string;
    toolResult?: string;
    error?: string;
    command?: string;
  };
  status: ActionStatus;
  userApproved?: boolean;
}

export interface AgentConfig {
  codebasePath: string;
  maxFileSizeToRead: number;
  excludePatterns: string[];
  tools: {
    allowShellExecution: boolean;
    allowFileModification: boolean;
    allowFileCreation: boolean;
    allowFolderCreation: boolean;
  };
}
;
export const defaultAgentConfig = (): AgentConfig => ({
  codebasePath: process.cwd(),
//   according to this : codebase path aap ka vhi hoga jiss directory mein aap kaam kar raha ho.
  maxFileSizeToRead: 1024 * 1024 ,
  excludePatterns: [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.next',
    '*.log',
    '.env*',
  ],
  tools: {
    allowShellExecution: true,
    allowFileModification: true,
    allowFileCreation: true,
    allowFolderCreation: true,
  },
});

// mutation ka matlab hota hai koi chij create ya update karna.
export function isMutationType(t: ActionType): boolean {
  return (
    t === 'file_create' ||
    t === 'file_modify' ||
    t === 'file_delete' ||
    t === 'folder_create' ||
    t === 'tool_execute'
  );
}
