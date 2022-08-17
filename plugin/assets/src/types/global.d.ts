export {};
import { WP } from 'wp-types';
declare global {
    interface Window {
        materialDesignWizard: materialDesignWizard;
        wp: WP;
        _wpCustomizeSettings: any;
		material_m3_migration_color:{
			nonce: string;
			primaryColor: string;
		},
		material_m3_migration_notice: {
			nonce: string;
		}
    }
}

type materialDesignWizard = {
    [key: string]: string | undefined
}
