import { OutputOptions } from "./config"

export interface ChunkOptions {
    id: string;
    modules: ModuleInfo[];
    isEntry: boolean;
    isDynamicEntry: boolean;
    facadeModuleId?: string;
    name?: string;
}

export interface ChunkInfo {
    id: string;
    name: string;
    isEntry: boolean;
    isDynamicEntry: boolean;
    isImplicitEntry: boolean;
    facadeModuleId: string | null;
    modules: Record<string, RenderedModule>;
    exports: string[];
    imports: string[];
    dynamicImports: string[];
    fileName: string;
    size: number;
    type: 'chunk';
}

export interface RenderedModule {
    code: string | null;
    originalLength: number;
    removedExports: string[];
    renderedExports: string[];
    renderedLength: number;
}

export interface ChunkDependency {
    id: string;
    name: string;
    isExternal: boolean;
    isDynamic: boolean;
    importedNames: string[];
    reexportedNames: string[];
}

export interface ChunkImport {
    name: string;
    localName: string;
    isDefault: boolean;
    isNamespace: boolean;
    module: ModuleInfo;
}

export interface ChunkGraph {
    chunks: Map<string, ChunkInfo>;
    dependencies: Map<string, ChunkDependency[]>;
    entryChunks: Set<string>;
    dynamicChunks: Set<string>;
}