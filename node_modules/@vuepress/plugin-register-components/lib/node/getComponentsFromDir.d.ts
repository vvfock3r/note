import type { RegisterComponentsPluginOptions } from './registerComponentsPlugin';
export declare const getComponentsFromDir: ({ componentsDir, componentsPatterns, getComponentName, }: Omit<Required<RegisterComponentsPluginOptions>, 'components'>) => Promise<Record<string, string>>;
