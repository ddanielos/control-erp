'use client'

import { Amplify } from 'aws-amplify';

export const authConfig = {
    Cognito: {
        userPoolId: 'us-east-2_7z0j70SjS',
        userPoolClientId: '4p6d320tbf8bniij9mc6dr8l7i'
    }
}

Amplify.configure(
    {
        Auth: authConfig,
    },
    { ssr: true }
);

export default function ConfigureAmplifyClientSide(){
    return null;
}