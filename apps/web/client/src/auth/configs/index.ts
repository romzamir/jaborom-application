import {FirebaseOptions} from 'firebase/app';

import {FIREBASE_CONFIG_TEST} from './test';

export function getConfig(name: BuildType) {
    return CONFIGS[name];
}

const CONFIGS: Record<BuildType, FirebaseOptions> = {
    Test: FIREBASE_CONFIG_TEST,
};

type BuildType = 'Test';
