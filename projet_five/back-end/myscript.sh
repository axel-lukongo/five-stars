
echo "====> INSTALLATION OF FASTAPI! <===="
pip install fastapi
echo "====> FASTAPI INSTALLED! <===="

echo "====> INSTALLATION OF UVICORN! <===="
pip install "uvicorn[standard]"
echo "====> UVICORN INSTALLED! <===="

echo "====> INSTALLATION OF DOTENV! <===="
pip install python-dotenv
echo "====> DOTENV INSTALLED! <===="


echo "====> INSTALLATION OF STRAWBERRY! <===="
pip install 'strawberry-graphql[fastapi]'
echo "====> STRAWBERRY INSTALLED! <===="


echo "====> INSTALLATION OF ALEMBIC! <===="
#tools who allow us to migrate our models to our db
pip install alembic
echo "====> ALEMBIC INSTALLED! <===="

echo "=========>>>>>>>>>> BACK END IS READY! <<<<<<<<<<<=============="

# uvicorn main:app --reload --host 0.0.0.0 --port 8000
tail -f /dev/null