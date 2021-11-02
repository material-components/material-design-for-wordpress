export {};

declare global {
    interface Window {
        materialDesignWizard: materialDesignWizard;
        wp: any;
        _wpCustomizeSettings: any;
    }
}

type materialDesignWizard = {
    [key: string]: string | undefined
}
