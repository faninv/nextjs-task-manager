import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In a real app, you'd use a database
let tasks: Array<{ id: string; title: string; description: string; createdAt: Date }> = [];

export async function POST(request: NextRequest) {
    try {
        const { title, description } = await request.json();

        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            createdAt: new Date(),
        };

        tasks.push(newTask);

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(tasks);
}
