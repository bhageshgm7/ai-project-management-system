from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    total_tasks = serializers.SerializerMethodField()
    completed_tasks = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "manager",
            "status",
            "start_date",
            "end_date",
            "total_tasks",
            "completed_tasks",
            "progress",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "total_tasks",
            "completed_tasks",
            "progress",
            "created_at",
            "updated_at",
        ]

    def get_total_tasks(self, obj):
        return obj.tasks.count()

    def get_completed_tasks(self, obj):
        return obj.tasks.filter(status="COMPLETED").count()

    def get_progress(self, obj):
        total_tasks = obj.tasks.count()

        if total_tasks == 0:
            return 0

        completed_tasks = obj.tasks.filter(
            status="COMPLETED"
        ).count()

        return round((completed_tasks / total_tasks) * 100)