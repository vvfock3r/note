import type { Plugin } from '@vuepress/core';
export interface RegisterComponentsPluginOptions {
    components?: Record<string, string>;
    componentsDir?: string | null;
    componentsPatterns?: string[];
    getComponentName?: (filename: string) => string;
}
export declare const registerComponentsPlugin: ({ components, componentsDir, componentsPatterns, getComponentName, }?: RegisterComponentsPluginOptions) => Plugin;
