import requests
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
def get_lost():
    url="http://localhost:1337/api/lost-items/all"
    lost_items=requests.get(url).json()
    return lost_items

def get_found():
    url="http://localhost:1337/api/found-items/all"
    found_items=requests.get(url).json()
    print(found_items)
    return found_items

def sendMail(email: str, subject: str, body:str):
    
    message = Mail(
        from_email='codeinit2023@gmail.com',
        to_emails=email,
        subject=subject,
        html_content=body)
    try:
        sg = SendGridAPIClient(YOUR_API_KEY)
        response = sg.send(message)
        return str (response.status_code)
        # print(response.body)
        # print(response.headers)
    except Exception as e:
        print(e.message)
        return "Error"

if __name__=="__main__":
    get_found()