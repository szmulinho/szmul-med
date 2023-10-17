declare module 'react-github-login' {
    const GitHubLogin: React.FC<{
        clientId: string;
        onSuccess: (response: any) => void;
        onFailure: (response: any) => void;
        redirectUri?: string;
        buttonText?: string;
        className?: string;
    }>;

    export default GitHubLogin;
}
