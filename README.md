$: sudo python3 -m venv /opt/certbot
$: sudo /opt/certbot/bin/pip install --upgrade pip
$: sudo /opt/certbot/bin/pip install certbot
$: sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot

$: sudo certbot certonly --standalone

# be sure if using namecheap to add the CAA Record issue letsencrypt.org
