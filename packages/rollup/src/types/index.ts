export interface RollupConfig {
    input: string | string[];
    output: OutputOptions;
    // plugins?: Plugin[];
    external?: string[] | ((id: string) => boolean);
    treeshake?: boolean | TreeshakeOptions;
    onwarn?: (warning: RollupWarning) => void;
}

export interface OutputOptions {
    file?: string;
    dir?: string;
    format: 'es' | 'cjs' | 'umd' | 'iife';
    name?: string;
    sourcemap?: boolean;
    banner?: string;
    footer?: string;
}

export type InputOptions = RollupConfig

export interface Plugin {
    name: string;
    buildStart?(options: InputOptions): Promise<void> | void;
    resolveId?(id: string, importer?: string): Promise<string | null> | string | null;
    load?(id: string): Promise<string | null> | string | null;
    transform?(code: string, id: string): Promise<TransformResult | null> | TransformResult | null;
    generateBundle?(options: OutputOptions, bundle: Bundle): Promise<void> | void;
    writeBundle?(options: OutputOptions, bundle: Bundle): Promise<void> | void;
}

export interface TransformResult {
    code: string;
    map?: string;
    ast?: any;
}

export interface TreeshakeOptions {
    propertyReadSideEffects?: boolean;
    moduleSideEffects?: boolean | 'no-external' | ((id: string) => boolean);
    annotations?: boolean;
}

export interface RollupWarning {
    code: string;
    message: string;
    id?: string;
    loc?: {
        file?: string;
        line: number;
        column: number;
    };
    frame?: string;
    plugin?: string;
    pluginCode?: string;
}

export type Bundle = Record<string, any>

export interface OutputChunk {
    type: 'chunk';
    fileName: string;
    code: string;
    map?: string;
    isEntry: boolean;
    modules: Record<string, ModuleInfo>;
}

export interface OutputAsset {
    type: 'asset';
    fileName: string;
    source: string | Uint8Array;
}

export interface ModuleInfo {
    id: string;
    code: string;
    ast?: any;
    dependencies: string[];
    exports: string[];
}
