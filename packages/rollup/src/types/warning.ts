// import { RollupWarning } from ".";

export type WarningHandler = (warning: RollupWarning) => void;

export interface RollupWarning {
    code?: string;
    frame?: string;
    id?: string;
    loc?: {
      column: number;
      file?: string;
      line: number;
    };
    message: string;
    names?: string[];
    plugin?: string;
    pos?: number;
    source?: string;
    stack?: string;
    toString: () => string;
    url?: string;
}