export {};

declare global {
    interface Window {
		materialDesignWizardTheme: materialDesignWizard;
        materialDesignWizard: materialDesignWizard;
        wp: any;
        _wpCustomizeSettings: any;
    }
}

type materialDesignWizard = {
    [key: string]: string | undefined
}
