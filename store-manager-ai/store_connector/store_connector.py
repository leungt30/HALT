import requests

class StoreConnector:
    def __init__(self, api_url):
        self.api_url = api_url
        self.session = requests.Session()
        self.session.headers = {"Content-Type": "application/json"}

    def fetch_current_layout(self):
        try:
            response = self.session.get(f"{self.api_url}api/layout")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print("Error fetching current layout:", str(e))
            return None

    def update_layout(self, new_layout):
        try:
            response = self.session.post(
                f"{self.api_url}api/layout",
                json=new_layout
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print("Error updating layout:", str(e))
            return None