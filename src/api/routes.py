"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity


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
        return jsonify({"created": True}), 200
        # a través de JSON. Por ende, tenemos que llamar a la función serialize de la propia instancia de clase
    else:
        # Con el 400, indicamos que enviar faltando uno de los dos datos, sale un error 400 e indica missing info
        return jsonify({"created": False, "msg": "Missing info"}), 400

    # LA VALIDACIón de campos debe estar tanto en el backend como en el frontend. Y no debería siquiera hacer un envío (400) en caso de que falta algo en el campo
    # ya no debería siquiera permitir hacer esto


@api.route("/login", methods=["POST"])
def login_user():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    if body_email and body_password:
        # si tenemos un body email y body password, pues procedemos a buscar el usuario en nuestra base de datos. Para buscarlo hacemos lo siguiente:
        user = User.query.filter_by(email=body_email).filter_by(
            password=body_password).first()  # esto es con filter by
        # si quisieramos usarlo con filter
        # user = User.query.filter, sería como la línea de abajo (es exactamente lo mismo, de maneras distintas.)
        #     User.email == body_email, User.password == body_password)
        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify({"logged": True, "token": access_token, "user": user.serialize()}), 200
        else:
            return jsonify({"logged": False, "msg": "Missing info"}), 400
    else:
        return jsonify({"logged": False, "msg": "Missing info"}), 400


@api.route("/planet", methods=["GET"])
@jwt_required()
def get_planets():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"planets": ["planet1", "planet2", "planet3", "planet4"]})
    else:
        return jsonify({"msg": "Not authorized"}), 400
