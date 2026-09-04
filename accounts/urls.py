from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import RegisterView, UserViewSet, CheckUserView


router = DefaultRouter()

router.register(
    "users",
    UserViewSet,
    basename="users"
)


urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "check-user/",
        CheckUserView.as_view(),
        name="check-user"
    ),
]


urlpatterns += router.urls