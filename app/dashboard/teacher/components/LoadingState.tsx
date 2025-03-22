interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
    return (
        <div className="flex justify-center py-4">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    );
} 