export interface TransformOptions {
    id: string;
    code: string;
    ast?: AstNode;
    sourcemap?: boolean;
    minify?: boolean;
    compress?: boolean;
}

export interface TransformResult {
    code: string;
    map?: SourceMap | null;
    ast?: AstNode;
    dependencies?: string[];
    assets?: string[];
    warnings?: TransformWarning[];
}

export interface TransformWarning {
    message: string;
    code?: string;
    loc?: {
        line: number;
        column: number;
    };
    frame?: string;
}

export interface TransformContext {
    id: string;
    code: string;
    ast: AstNode;
    sourcemap: boolean;
    warn: (warning: TransformWarning) => void;
    error: (error: Error) => never;
    resolve: (id: string) => Promise<string | null>;
    load: (id: string) => Promise<string>;
    emitFile: (file: EmittedFile) => string;
    getModuleInfo: (id: string) => ModuleInfo | null;
}

export interface Transformer {
    name: string;
    transform: (context: TransformContext) => TransformResult | Promise<TransformResult>;
}

export interface ScopeAnalysis {
    scopes: Map<AstNode, Scope>;
    variables: Map<string, Variable>;
    references: Map<string, Reference>;
    globals: Set<string>;
}

export interface Scope {
    type: 'global' | 'module' | 'function' | 'block' | 'catch';
    node: AstNode;
    parent?: Scope;
    children: Set<Scope>;
    variables: Map<string, Variable>;
    references: Set<Reference>;
    isStrict: boolean;
}
