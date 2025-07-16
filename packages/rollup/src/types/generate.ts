import { ChunkInfo } from "./chunk";
import { ModuleFormat } from "./config";

export interface GenerateOptions {
    format: ModuleFormat;
    name?: string;
    globals?: Record<string, string>;
    banner?: string;
    footer?: string;
    intro?: string;
    outro?: string;
    indent?: string | boolean;
    strict?: boolean;
    freeze?: boolean;
    namespaceToStringTag?: boolean;
    noConflict?: boolean;
    sourcemap?: boolean | 'inline';
    sourcemapFile?: string;
    sourcemapPathTransform?: (path: string) => string;
    interop?: 'auto' | 'esModule' | 'default' | 'defaultOnly';
    extend?: boolean;
    externalLiveBindings?: boolean;
    compact?: boolean;
    minifyInternalExports?: boolean;
    preserveModules?: boolean;
    preserveModulesRoot?: string;
    exports?: 'auto' | 'default' | 'named' | 'none';
    esModule?: boolean;
    validate?: boolean;
    systemNullSetters?: boolean;
    amd?: {
        id?: string;
        autoId?: boolean;
        basePath?: string;
        define?: string;
        forceJsExtensionForImports?: boolean;
    };
}

export interface GenerateResult {
    code: string;
    map?: SourceMap | null;
    chunks: ChunkInfo[];
    assets: AssetInfo[];
    warnings: GenerateWarning[];
    stats: GenerateStats;
}

export interface GenerateWarning {
    message: string;
    code?: string;
    chunk?: ChunkInfo;
    loc?: {
        line: number;
        column: number;
    };
}

export interface GenerateStats {
    totalSize: number;
    chunkCount: number;
    assetCount: number;
    generationTime: number;
}

export interface AssetInfo {
    fileName: string;
    name?: string;
    source: string | Uint8Array;
    type: 'asset';
    size: number;
}

export interface CodeGenerator {
    format: ModuleFormat;
    generate: (chunks: ChunkInfo[], options: GenerateOptions) => GenerateResult;
}

export interface FormatGenerator {
    generateWrapper: (code: string, options: GenerateOptions) => string;
    generateImport: (importInfo: ImportInfo, options: GenerateOptions) => string;
    generateExport: (exportInfo: ExportInfo, options: GenerateOptions) => string;
    generateInterop: (moduleId: string, options: GenerateOptions) => string;
}

export interface ImportInfo {
    source: string;
    imports: ImportSpecifier[];
    isExternal: boolean;
    isDynamic: boolean;
}

export interface ExportInfo {
    name: string;
    localName: string;
    isDefault: boolean;
    isNamespace: boolean;
    source?: string;
}

export interface ImportSpecifier {
    imported: string;
    local: string;
    isDefault: boolean;
    isNamespace: boolean;
}

export interface ExportSpecifier {
    exported: string;
    local: string;
    isDefault: boolean;
    isNamespace: boolean;
}
