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

# echo "====> INSTALLATION OF ALEMBIC! <===="
# #tools who allow us to migrate our models to our db
# pip install alembic
# echo "====> ALEMBIC INSTALLED! <===="

echo "====> INSTALLATION OF PYTEST! <===="
pip install pytest
echo "====> PYTEST installed! <===="

echo "====> INSTALLATION OF PYTEST! <===="
pip install httpx
echo "====> PYTEST installed! <===="

echo "====> INSTALLATION OF fastapi.middleware.cors! <===="
pip install fastapi[all]
echo "====> fastapi.middleware.cors installed! <===="

echo "====> INSTALLATION OF PYTHON-JOSE PASSLIB! <===="
pip install "python-jose[cryptography]"
pip install "passlib[bcrypt]"

echo "====> PYTHON-JOSE PASSLIB INSTALLED! <===="


echo "=========>>>>>>>>>> BACK END IS READY! <<<<<<<<<<<=============="

# uvicorn main:app --reload --host 0.0.0.0 --port 8000
tail -f /dev/null