#!/usr/bin/env python
try:
    #python3
    import urllib.request as urlrequest
    import urllib.parse as urlencode
except:
    #python2
    import urllib as urlrequest
    import urllib as urlencode
import json
import argparse
import getpass

CLIENT_ID = '712873'
CLIENT_SECRET = '6059239ea72057f16538eeb56665d50431518b1a5f498a6e8cef617d'
SSO_TOKEN_ENDPOINT = 'https://openid.eodataservice.org/oidc/token/'
#SSO_TOKEN_ENDPOINT = 'http://localhost:8001/oidc/token/'

def login( username, password ):
    post_data = {
        'username': username,
        'password': password,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'password'
    }
    try:
        request = urlrequest.urlopen( SSO_TOKEN_ENDPOINT, urlencode.urlencode( post_data ).encode( 'ascii' ) )
        str_request = request.read().decode('utf-8')
    except Exception as ex:
        print(ex)
        return ex

    content = json.loads( str_request )
    return content


if __name__ == "__main__":
    parser = argparse.ArgumentParser( description = "Insert username and password")
    parser.add_argument(
        "-u", "--username",
        type = str,
        help = "Insert Username",
        required = True
    )
    parser.add_argument(
        "-p", "--password",
        type = str,
        help = "Omit this parameter if you want to insert a password without echoing to the screen"
    )

    args = parser.parse_args()
    if args.password is None:
        args.password = getpass.getpass()

    token_data = login( args.username, args.password )
    print ( token_data )
