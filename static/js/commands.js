const figlet = " _____ _  __   __         \n" +
    "|  _  | | \\ \\ / /         \n" +
    "| | | | |__\\ V /___  __ _ \n" +
    "| | | | '_ \\\\ // _ \\/ _` |\n" +
    "\\ \\_/ / | | | |  __/ (_| |\n" +
    " \\___/|_| |_\\_/\\___|\\__,_|\n" +
    "                          "

const version = "v0.2.0";
const sessionId = sessionIdGenerator();
const isElectron = navigator.userAgent.includes('Electron');

$('body').terminal({
    exit: function() {
        window.close();
    },
    about: function() {
        this.echo(version);
        this.echo(navigator.userAgent);
        this.echo('sessionId: ' + sessionId)
        if (isElectron) {
            this.echo('Electron')
        }
    },
    auth: async function(key) {
        try {
            let response = await pushJSON('auth', {key: key})
            if (response["auth"]) {
                if (response["auth"] === true) {
                    this.echo('authenticated');
                } else if (response["auth"] === false) {
                    this.echo('not authenticated');
                }
            } else {
                this.echo(response);
            }
        } catch (e) {
            this.echo(e)
        }
    },
    }, {
    greetings: (figlet + version +`\nPlease use the { auth } command to authenticate this session`),
});

function pushJSON(endpoint, data) {
    const domain = "http://localhost:5000";
    const sub = "/" + endpoint;
    const url = domain + sub;
    data['sessionId'] = sessionId;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions)
        .then((response) => {
            if (response.headers.get('content-type').includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Received non-JSON response');
            }
        })
        .then((data) => {
            console.log("Response data:", data);
            return data;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function sessionIdGenerator() {
    let sessionId = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 100; i++) {
        sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return sessionId;
}