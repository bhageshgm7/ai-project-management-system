from rest_framework import viewsets

from accounts.permissions import IsAdmin, IsManager, IsMember
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    filterset_fields = ["project", "assigned_to", "priority", "status"]
    search_fields = ["title", "description"]
    ordering_fields = ["title", "priority", "status", "due_date", "created_at"]

    def get_queryset(self):
        user = self.request.user

        if user.role == "ADMIN":
            return Task.objects.all().order_by("-created_at")

        if user.role == "MANAGER":
            return Task.objects.filter(
                project__manager=user
            ).order_by("-created_at")

        return Task.objects.filter(
            assigned_to=user
        ).order_by("-created_at")

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [IsMember]
        elif self.action in ["create", "update", "partial_update"]:
            permission_classes = [IsManager]
        elif self.action == "destroy":
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsMember]

        return [permission() for permission in permission_classes]