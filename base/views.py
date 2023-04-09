from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.serializers import UserSerializer, UserSerializerWithToken, UserSerializerWithPass
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView

from rest_framework.pagination import PageNumberPagination

from .models import Post, PostComment, PostImage
from .serializers import PostSerializer, CommentSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class registerUser(CreateAPIView):
    serializer_class = UserSerializerWithPass

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        user = serializer.save()
        user.password = make_password(user.password)
        user.save()

class getUser(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_user(self):
        return self.request.user

    def retrieve(self, request):
        user = self.get_user()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class postList(ListAPIView):
    queryset = Post.objects.all().order_by('-date')
    serializer_class = PostSerializer
    pagination_class = PageNumberPagination

class commentList(ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        post = Post.objects.get(pk=self.kwargs.get('pk'))
        comments = PostComment.objects.filter(post=post).order_by('-date')
        return comments

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

class comment(APIView):
    def post(self, request, id):
        user = request.user
        data = request.data

        if data['text'] == '':
            return Response({'message': 'Invalid Comment'}, status=status.HTTP_400_BAD_REQUEST)

        post = Post.objects.get(pk=id)

        comment = PostComment.objects.create(
            user=user,
            post=post,
            content=data['text']
        )

        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)
    
    def put(self, request, id):
        user = request.user
        data = request.data

        if data['text'] == '':
            return Response({'message': 'Invalid Comment'}, status=status.HTTP_400_BAD_REQUEST)

        comment = PostComment.objects.get(pk=id)

        if user != comment.user:
            return Response({"message": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

        comment.content = data['text']

        comment.save()

        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)
    
    def delete(self, request, id):
        try:
            comment = PostComment.objects.get(pk=id)
            if comment.user != request.user:
                return Response({"message": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)
            comment.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response({"message": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)


