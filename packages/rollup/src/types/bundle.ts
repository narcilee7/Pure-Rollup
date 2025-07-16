import { Chunk, RenderedModule } from "./chunk";
import { OutputOptions } from "./config";

export interface Bundle {
    chunks: Map<string, Chunk>;
    assets: Map<string, Asset>;

    generate(): Promise<OutputBundle>;
    write(options: OutputOptions): Promise<void>;
    getChunk(fileName: string): Chunk | undefined;
    getAsset(fileName: string): Asset | undefined;
}

export interface OutputBundle {
    [fileName: string]: OutputChunk | OutputAsset;
}

export interface OutputChunk {
    type: 'chunk';
    code: string;
    dynamicImports: string[];
    exports: string[];
    facadeModuleId: string | null;
    fileName: string;
    imports: string[];
    isDynamicEntry: boolean;
    isEntry: boolean;
    isImplicitEntry: boolean;
    map: any;
    modules: Record<string, RenderedModule>;
    name: string;
    preliminaryFileName: string;
  }
  
  export interface OutputAsset {
    type: 'asset';
    fileName: string;
    source: string | Uint8Array;
  }
  
  export interface Asset {
    fileName: string;
    source: string | Uint8Array;
    referenceId: string;
    name?: string;
  }

  export interface RenderedChunk {
    dynamicImports: string[];
    exports: string[];
    facadeModuleId: string | null;
    fileName: string;
    imports: string[];
    isDynamicEntry: boolean;
    isEntry: boolean;
    isImplicitEntry: boolean;
    modules: Record<string, RenderedModule>;
    name: string;
    preliminaryFileName: string;
  }