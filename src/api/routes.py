"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route("/signup", methods=["POST"])
def create_user():
    # las siguientes dos lineas sirven para recoger los inputs que pasamos desde frontend
    # entre comillas el parametro que queremos en nuestra api recibir desde el frontend

    body_email = request.json.get("email")
    body_password = request.json.get("password")
    # cuando los recibamos, si lo hacemos, vamos a crear el usuario. En caso de no recibirlo, no creamos el usuario.
    # si está email y password, creamos el usuario (new_user)
    if body_email and body_password:
        # aca llamamos a nuestra clase de User para instanciarla (Database)Les pasamos los dos parametros (las columnas de las Database)
        new_user = User(email=body_email, password=body_password)
        # creamos una clase user, donde en la columna email y password, le metemos el valor de body email y body password que recibimos en la petición
        # guardo los datos que se agregaron a la base de datos
        db.session.add(new_user)
        db.session.commit()
        # new_user es una instancia de clase que no puede ser reenviada
        return jsonify({"created": True, "user": new_user.serialize()}), 200
        # a través de JSON. Por ende, tenemos que llamar a la función serialize de la propia instancia de clase
    else:
        return jsonify({"created": False, "msg": "Missing info"}), 200
