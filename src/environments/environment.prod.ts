const port: string = `:${+window.location.port - 1}`;
const protocol: string = window.location.protocol;
const domain: string = `${window.location.hostname}${port}`;
const baseUrl: string = `${protocol}//${domain}`;

export const environment = {
    production: true,
    baseUrl: `${baseUrl}/`
};
