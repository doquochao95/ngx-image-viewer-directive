const port: string = ':5000';
const protocol: string = window.location.protocol;
const domain: string = `${window.location.hostname}${port}`;
const baseUrl: string = `${protocol}//${domain}`;

export const environment = {
    production: false,
    baseUrl: `${baseUrl}/`
};
