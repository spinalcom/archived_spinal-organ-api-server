declare const config: {
    spinalConnector: {
        user: string | number;
        password: string;
        host: string;
        port: string | number;
    };
    api: {
        host: string;
        port: number;
    };
    file: {
        path: string;
    };
};
export default config;
