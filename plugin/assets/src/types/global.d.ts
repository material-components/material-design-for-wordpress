export {};

declare global {
    interface Window {
        materialDesignWizard: materialDesignWizard;
        wp: any;
    }
}

type materialDesignWizard = {
    [key: string]: string | undefined
}
