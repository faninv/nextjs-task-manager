import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { status } = await request.json();
        const { id } = params;

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        const validStatuses = ['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedTask);
    } catch (error) {
        console.error('Failed to update task:', error);
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        );
    }
}
