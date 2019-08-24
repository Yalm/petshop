export interface Token {
    object: string,
    id: string,
    type: string,
    email: string,
    creation_date: number,
    card_number: string,
    last_four: string,
    active: boolean,
    iin: iin,
    client: client,
    metadata: metadata
}

interface iin {
    object: string,
    bin: string,
    card_brand: string,
    card_type: string,
    card_category: string,
    issuer: issuer,
    installments_allowed: number[]
}

interface issuer {
    name: string,
    country: string,
    country_code: string,
    website: string,
    phone_number: string
}

interface client {
    ip: string,
    ip_country: string,
    ip_country_code: string,
    browser: string,
    device_fingerprint: string,
    device_type: string
}

interface metadata {
    dni: string,
}

export interface OptionsCulqi {
    lang?: 'auto' | 'en' | 'es',
    modal?: boolean,
    installments?: boolean,
    customButton?: string,
    style?: {
        logo?: string,
        maincolor?: string,
        buttontext?: string,
        maintext?: string,
        desctext?: string
    }
}
