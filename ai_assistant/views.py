import requests

from django.utils import timezone

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from projects.models import Project
from tasks.models import Task


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ask_ai(request):
    question = request.data.get("question", "").strip()

    if not question:
        return Response(
            {"error": "Question is required."},
            status=400
        )

    try:
        today = timezone.localdate()

        projects = Project.objects.all()
        tasks = Task.objects.all()

        project_data = []

        for project in projects:
            project_tasks = tasks.filter(project=project)

            total_tasks = project_tasks.count()

            completed_tasks = project_tasks.filter(
                status=Task.Status.COMPLETED
            ).count()

            if total_tasks > 0:
                progress = round(
                    (completed_tasks / total_tasks) * 100
                )
            else:
                progress = 0

            project_data.append(
                {
                    "id": project.id,
                    "name": project.name,
                    "description": project.description,
                    "status": project.status,
                    "start_date": str(project.start_date)
                    if project.start_date
                    else None,
                    "end_date": str(project.end_date)
                    if project.end_date
                    else None,
                    "total_tasks": total_tasks,
                    "completed_tasks": completed_tasks,
                    "progress_percent": progress,
                }
            )

        task_data = []

        for task in tasks:
            is_completed = task.status == Task.Status.COMPLETED

            is_overdue = (
                task.due_date is not None
                and task.due_date < today
                and not is_completed
            )

            task_data.append(
                {
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "project_id": task.project_id,
                    "priority": task.priority,
                    "status": task.status,
                    "due_date": str(task.due_date)
                    if task.due_date
                    else None,
                    "is_overdue": is_overdue,
                }
            )

        high_priority_tasks = [
            task
            for task in task_data
            if task["priority"] in ["HIGH", "URGENT"]
            and task["status"] != Task.Status.COMPLETED
        ]

        overdue_tasks = [
            task
            for task in task_data
            if task["is_overdue"]
        ]

        completed_task_count = tasks.filter(
            status=Task.Status.COMPLETED
        ).count()

        pending_task_count = tasks.exclude(
            status=Task.Status.COMPLETED
        ).count()

        context = f"""
You are an AI assistant inside a project management system.

IMPORTANT:
The Django backend has already calculated the factual information.
Do NOT invent, change, or recalculate dates, task counts, progress,
priorities, or statuses.

TODAY'S DATE:
{today}

PROJECTS:
{project_data}

ALL TASKS:
{task_data}

HIGH AND URGENT INCOMPLETE TASKS:
{high_priority_tasks}

OVERDUE INCOMPLETE TASKS:
{overdue_tasks}

TOTAL COMPLETED TASKS:
{completed_task_count}

TOTAL INCOMPLETE TASKS:
{pending_task_count}

USER QUESTION:
{question}

Instructions:

1. Answer using the supplied project and task information.

2. Be accurate about dates, priorities, statuses, and progress.

3. If two tasks have the same due date, explicitly say they have
the same due date.

4. Do not claim one task is earlier than another when their dates
are equal.

5. If recommending a task, explain the recommendation using
priority, overdue status, due date, and project progress when relevant.

6. If there are no overdue tasks, clearly say so.

7. Keep the response clear and useful.

8. If the question is unrelated to the project management data,
answer normally.
"""

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2",
                "prompt": context,
                "stream": False
            },
            timeout=120
        )

        response.raise_for_status()

        data = response.json()

        answer = data.get("response", "").strip()

        if not answer:
            return Response(
                {"error": "AI returned an empty response."},
                status=500
            )

        return Response(
            {"answer": answer},
            status=200
        )

    except requests.exceptions.ConnectionError:
        return Response(
            {"error": "Ollama is not running. Please start Ollama."},
            status=500
        )

    except requests.exceptions.Timeout:
        return Response(
            {"error": "AI response timed out. Please try again."},
            status=500
        )

    except Exception as e:
        print("AI Assistant error:", str(e))

        return Response(
            {"error": "AI Assistant failed to generate a response."},
            status=500
        )