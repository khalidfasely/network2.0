from django.contrib import admin
from .models import Post, PostComment, PostImage

# Register your models here.
admin.site.register(Post)
admin.site.register(PostComment)
admin.site.register(PostImage)