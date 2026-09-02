from rest_framework import viewsets

from accounts.permissions import IsAdmin, IsManager, IsMember
from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    filterset_fields = ["status", "manager"]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "start_date", "end_date", "created_at"]

    def get_queryset(self):
        user = self.request.user

        if user.role == "ADMIN":
            return Project.objects.all().order_by("-created_at")

        if user.role == "MANAGER":
            return Project.objects.filter(
                manager=user
            ).order_by("-created_at")

        return Project.objects.filter(
            tasks__assigned_to=user
        ).distinct().order_by("-created_at")

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