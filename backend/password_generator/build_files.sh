python3.9 -m pip install --upgrade pip 
python3.9 pip install --root-user-action=ignore
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear