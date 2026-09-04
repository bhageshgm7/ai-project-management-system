from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .models import User
from .serializers import RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class CheckUserView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        username = request.query_params.get("username")

        if not username:
            return Response({
                "error": "username is required"
            })

        user = User.objects.filter(username=username).first()

        if user:
            return Response({
                "exists": True,
                "username": user.username,
                "is_active": user.is_active,
                "role": user.role,
            })

        return Response({
            "exists": False
        })