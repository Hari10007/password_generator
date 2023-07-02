python3.9 -m venv venv
source venv/bin/activate
python3.9 pip install -r requirements.txt
python3.9 manage.py makemigrations
python3.9 manage.py migrate
python3.9 manage.py collectstatic