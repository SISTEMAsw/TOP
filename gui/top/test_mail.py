import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL_HOST = 'mail.sistema.at'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'topregistration@sistema.at'
EMAIL_HOST_PASSWORD = 't0pR3gi$tration'

subject = 'This is the subject' # The subject line
message = 'This is my message'
dest = [ 'damianobarboni@gmail.com', 'barboni@meeo.it', 'natali@sistema.at', 'natali@meeo.it' ]
msg = MIMEMultipart()
msg['From'] = EMAIL_HOST_USER
msg['To'] = ", ".join( dest )
msg['Subject'] = subject

# Attach the message to the MIMEMultipart object
msg.attach(MIMEText(message, 'plain'))

# Try to log in to server and send email
try:
    server = smtplib.SMTP( EMAIL_HOST, EMAIL_PORT )
    server.starttls() #context=context) # Secure the connection
    server.login( EMAIL_HOST_USER, EMAIL_HOST_PASSWORD )
    text = msg.as_string() # You now need to convert the MIMEMultipart object to a string to send
    server.sendmail( EMAIL_HOST_USER, dest, text ) # Send the email
    # TODO: Send email here
except Exception as e:
    # Print any error messages to stdout
    print(e)
finally:
    server.quit()
