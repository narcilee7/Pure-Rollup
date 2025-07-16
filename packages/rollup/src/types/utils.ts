export interface FileSystem {
    readFile(path: string): Promise<string>;
    writeFile(path: string, data: string): Promise<void>;
    exists(path: string): Promise<boolean>;
    stat(path: string): Promise<{ mtime: Date; size: number }>;
    readdir(path: string): Promise<string[]>;
    mkdir(path: string): Promise<void>;
    rmdir(path: string): Promise<void>;
}

export interface Logger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
}

export interface PerformanceTracker {
    start(name: string): void;
    end(name: string): number;
    measure(name: string, fn: () => any): any;
    getMetrics(): Record<string, number>;
}

export interface HashGenerator {
    hash(content: string): string;
    hashFile(path: string): Promise<string>;
}