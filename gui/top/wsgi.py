"""
WSGI config for top project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os, sys

# add the hellodjango project path into the sys.path
sys.path.append('home/ubuntu/topUI/top')

# add the virtualenv site-packages path to the sys.path
sys.path.append('home/ubuntu/topUI/topenv/lib/python3.6/site-packages')

from django.core.wsgi import get_wsgi_application
from mezzanine.utils.conf import real_project_name

os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                      "%s.settings" % real_project_name("top"))

application = get_wsgi_application()
