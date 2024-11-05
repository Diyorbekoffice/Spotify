async function getToken() {
    

    try {
       
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa('30eda8ed8e5f401797c9a57b3bc1be09' + ':' + '44f2f4420ec74730b6392353f27022b0')}`
            },
            body: 'grant_type=client_credentials'
        });


        const auth = await response.json();
        localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`)
        
        return data.access_token;
        

    } catch (error) {
        console.error("Token olishda xato yuz berdi:", error);
    }
}

export {getToken};
