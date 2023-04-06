from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveAPIView, ListAPIView
from rest_framework.mixins import RetrieveModelMixin

from rest_framework.pagination import PageNumberPagination

from .models import Post, PostComment, PostImage
from .serializers import PostSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class registerUser(APIView):

    def post(self, request):
        data = request.data
        try:
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password'])
            )

            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except:
            message = {'detail': 'User with this email already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class getUser(RetrieveAPIView):#RetrieveAPIView: Used for read-only endpoints to represent a single model instance.
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class postList(ListAPIView): #ListAPIView: Used for read-only endpoints to represent a collection of model instances.
    queryset = Post.objects.all().order_by('-date')
    serializer_class = PostSerializer
    pagination_class = PageNumberPagination

class post(APIView):
    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)
    
    def post(self, request):
        user = request.user
        data = request.data
        images = request.FILES.getlist('images')

        if data['text'] == '':
            return Response({'message': 'Invalid Post'}, status=status.HTTP_400_BAD_REQUEST)

        post = Post.objects.create(
            user=user,
            content=data['text']
        )

        for image in images:
            PostImage.objects.create(post=post, image=image)

        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)

    def put(self, request, pk):
        data = request.data
        images = request.FILES.getlist('images')

        if data['text'] == '':
            return Response({'message': 'Invalid Post'}, status=status.HTTP_400_BAD_REQUEST)

        post = Post.objects.get(pk=pk)

        if request.user != post.user:
            return Response({"message": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

        post.content = data['text']

        post.save()

        for image in images:
            PostImage.objects.create(post=post, image=image)

        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)


    def delete(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            if post.user != request.user:
                return Response({"message": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)
            post.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response({"message": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

"""class getUser(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
    

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)"""