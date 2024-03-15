type Task = {
    id: number;
    title: string;
    description?: string;
    assigneeId?: number;
    completed: boolean;
}

export {Task};