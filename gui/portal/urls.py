from django.conf.urls import include, url
from django.views.generic import TemplateView
from . import views


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='portal/index.html')),
    url(r'^datasets/$', TemplateView.as_view(template_name='portal/datasets.html')),
    url(r'^help/$', TemplateView.as_view(template_name='portal/help.html')),
    url(r'^news/$', TemplateView.as_view(template_name='blog/blog_list.html')),
    url(r'ground/$', views.get_ground),
    url(r'^PM10/(?P<start>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/(?P<end>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/$', 
        views.get_pm10),
    url(r'^SO2/(?P<start>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/(?P<end>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/$',
        views.get_so2),
    url(r'^NO2/(?P<start>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/(?P<end>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/$',
        views.get_no2),
    url(r'^CO/(?P<start>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/(?P<end>[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}\:[0-9]{2}Z)/$', 
        views.get_co)
]
