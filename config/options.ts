import { readFile, readFileAsync, writeFileAsync, monitorFile, Gio } from "astal/file";
import './global';
import { themeVar } from "../widget/components/bar/themeChanger";

type Options = {
    theme: string;
};

type OptionSetters = {
    [key in keyof Options]: (value: Options[key]) => void;
};

export class OptionsManager {
    private static instance: OptionsManager;
    private optionsPath: string;
    private options: Options;
    private optionsSetters: OptionSetters;
    private fileMonitor: Gio.FileMonitor | null = null;

    private constructor() {
        themeVar.subscribe((theme) => { this.options.theme = theme; this.saveOptions()})
        this.optionsPath = `${HOME}/.config/frame-0/options.json`;
        this.options = {
            theme: themeVar.get(),
        };
        this.optionsSetters = {
            theme: (value: string) => themeVar.set(value),
        };
    }

    public static getInstance(): OptionsManager {
        if (!OptionsManager.instance) {
            OptionsManager.instance = new OptionsManager();
        }
        return OptionsManager.instance;
    }

    public async initialize(): Promise<void> {
        try {
            await this.loadOptionsFromJson();
            this.setupFileMonitoring();
        } catch (error) {
            console.error('Failed to initialize options, creating default ones in HOME/.config/frame-0/options.json:', error);
            const jsonOptions = JSON.stringify(this.options, null, 2);
            await writeFileAsync(this.optionsPath, jsonOptions);
        }
    }

    private async loadOptionsFromJson(): Promise<void> {
        const fileContents = await readFileAsync(this.optionsPath);
        this.updateOptionsFromJson(fileContents);
    }

    private setupFileMonitoring(): void {
        if (this.fileMonitor) {
            this.fileMonitor.cancel();
        }
        this.fileMonitor = monitorFile(
            this.optionsPath,
            (filePath, fileEvent) => {
                if (fileEvent === Gio.FileMonitorEvent.CHANGES_DONE_HINT) {
                    const fileContents = readFile(filePath);
                    this.updateOptionsFromJson(fileContents);
                }
            }
        );
    }

    private updateOptionsFromJson(jsonString: string): void {
        const parsedOptions: Partial<Options> = JSON.parse(jsonString);
        (Object.keys(parsedOptions) as Array<keyof Options>).forEach((key) => {
            if (key in this.optionsSetters && parsedOptions[key] !== undefined) {
                this.options[key] = parsedOptions[key]!;
                this.optionsSetters[key](parsedOptions[key]!);
            }
        });
    }

    public getOption<K extends keyof Options>(key: K): Options[K] {
        return this.options[key];
    }

    public setOption<K extends keyof Options>(key: K, value: Options[K]): void {
        this.options[key] = value;
        this.optionsSetters[key](value);
        this.saveOptions();
    }

    private async saveOptions(): Promise<void> {
        const jsonOptions = JSON.stringify(this.options, null, 2);
        await writeFileAsync(this.optionsPath, jsonOptions);
    }

    public cleanup(): void {
        if (this.fileMonitor) {
            this.fileMonitor.cancel();
            this.fileMonitor = null;
        }
    }
}

export const optionsManager = OptionsManager.getInstance().initialize()