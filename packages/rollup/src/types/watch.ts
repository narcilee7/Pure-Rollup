export interface WatchOptions {
    buildDelay?: number;
    chokidar?: any;
    clearScreen?: boolean;
    exclude?: string | RegExp | (string | RegExp)[];
    include?: string | RegExp | (string | RegExp)[];
    skipWrite?: boolean;
}

export interface Watcher {
    on(event: string, handler: (...args: any[]) => void): void;
    close(): void;
}