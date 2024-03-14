import subprocess
import datetime


class Main:
    def __init__(self):
        self.authenticated = []

    def __authenticate(self, data):
        self.executable = "server/auth"
        self.username = data['username']
        self.password = data['password']

        result = subprocess.run([('./' + self.executable), self.password], capture_output=True, text=True)

        # Check the output
        if result.returncode == 0:
            print(f'authenticated {self.username}')
            return True
        else:
            return False

    def sessionAuth(self, data):
        for i in self.authenticated:
            if data['clientId'] in self.authenticated[i][0]:
                if (datetime.now() - self.authenticated[i][1]).total_seconds() <= 300:
                    return True
                else:
                    del self.authenticated[i]
                    return False
            else:
                if self.__authenticate(data):
                    self.authenticated.append([data['clientId'], datetime.now()])
                    return {'auth': True, 'clientId': data['clientId']}
                else:
                    return {'auth': False}

