// import { OutputBundle, OutputOptions } from './config';

export interface RollupBuild {
    cache RollupCache;
    close: () => Promise<void>;
}