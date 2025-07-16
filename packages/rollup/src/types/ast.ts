export interface AstNode {
    type: number;
    start: number;
    end: number;
    loc?: SourceLocation;
    parent?: AstNode;
    [key: string]: any;
}

