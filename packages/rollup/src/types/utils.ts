export interface FileSystemInterface {
    readFile: (path: string) => Promise<string>;
    writeFile: (path: string, content: string) => Promise<void>;
    exists: (path: string) => Promise<boolean>;
    stat: (path: string) => Promise<FileStats>;
    readdir: (path: string) => Promise<string[]>;
    mkdir: (path: string) => Promise<void>;
    rmdir: (path: string) => Promise<void>;
    unlink: (path: string) => Promise<void>;
    resolve: (...paths: string[]) => string;
    relative: (from: string, to: string) => string;
    dirname: (path: string) => string;
    basename: (path: string, ext?: string) => string;
    extname: (path: string) => string;
    join: (...paths: string[]) => string;
    isAbsolute: (path: string) => boolean;
    normalize: (path: string) => string;
}

export interface FileStats {
    isFile: () => boolean;
    isDirectory: () => boolean;
    size: number;
    mtime: Date;
    atime: Date;
    ctime: Date;
}
export interface PathUtilities {
    resolve: (...paths: string[]) => string;
    relative: (from: string, to: string) => string;
    dirname: (path: string) => string;
    basename: (path: string, ext?: string) => string;
    extname: (path: string) => string;
    join: (...paths: string[]) => string;
    isAbsolute: (path: string) => boolean;
    normalize: (path: string) => string;
    sep: string;
    delimiter: string;
}

export interface HashUtilities {
    md5: (content: string) => string;
    sha1: (content: string) => string;
    sha256: (content: string) => string;
    createHash: (algorithm: string) => HashInstance;
}

export interface HashInstance {
    update: (data: string | Buffer) => HashInstance;
    digest: (encoding?: string) => string | Buffer;
}

export interface LoggerInterface {
    debug: (message: string, ...args: any[]) => void;
    info: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
}

export interface TimerInterface {
    start: (label: string) => void;
    end: (label: string) => number;
    measure: (label: string, fn: () => any) => any;
    measureAsync: (label: string, fn: () => Promise<any>) => Promise<any>;
}

export interface CacheInterface<T = any> {
    get: (key: string) => T | undefined;
    set: (key: string, value: T, ttl?: number) => void;
    has: (key: string) => boolean;
    delete: (key: string) => boolean;
    clear: () => void;
    size: number;
    keys: () => string[];
    values: () => T[];
    entries: () => [string, T][];
}

export interface EventEmitterInterface {
    on: (event: string, listener: Function) => void;
    off: (event: string, listener: Function) => void;
    emit: (event: string, ...args: any[]) => void;
    once: (event: string, listener: Function) => void;
    removeAllListeners: (event?: string) => void;
    listenerCount: (event: string) => number;
    listeners: (event: string) => Function[];
}

export interface ProgressInterface {
    start: (total: number, message?: string) => void;
    update: (current: number, message?: string) => void;
    increment: (delta?: number, message?: string) => void;
    stop: () => void;
    setTotal: (total: number) => void;
    getTotal: () => number;
    getCurrent: () => number;
    getProgress: () => number;
}

export interface WorkerInterface {
    postMessage: (message: any) => void;
    onMessage: (handler: (message: any) => void) => void;
    terminate: () => void;
}

export interface WorkerPoolInterface {
    execute: <T>(task: any) => Promise<T>;
    terminate: () => Promise<void>;
    size: number;
    busy: number;
    pending: number;
}

export interface ConfigValidatorInterface {
    validate: (config: any, schema: any) => ValidationResult;
    validateSync: (config: any, schema: any) => ValidationResult;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}

export interface ValidationError {
    message: string;
    path: string;
    value: any;
    code: string;
}

export interface ValidationWarning {
    message: string;
    path: string;
    value: any;
    code: string;
}

