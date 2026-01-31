export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    date?: string; // YYYY-MM-DD
}
