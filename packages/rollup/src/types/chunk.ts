export interface Chunk {
    id: string;
    name: string;
    fileName: string;
    facadeModuleId: string | null;
    isDynamicEntry: boolean;
    isEntry: boolean;
    isImplicitEntry: boolean;
    modules: Record<string, RenderedModule>;
    imports: string[];
    dynamicImports: string[];
    exports: string[];
    code: string;
    map: any;
    preliminaryFileName: string;
    entryModules: string[];

    // 方法
    generateCode(): string;
    getImportPath(chunk: Chunk): string;
    render(): string;
}

export interface RenderedModule {
    originalLength: number;
    removedExports: string[];
    renderedExports: string[];
    renderedLength: number;
    code: string | null;
}