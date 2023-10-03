from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24) 
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:mauricio123@localhost:5433/inicio_registro_usuarios'
db = SQLAlchemy(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        print(name,email,password)
       
        try:
            new_user = Users(name=name, email=email, password=password)
            db.session.add(new_user)
            db.session.commit()
            flash("Registro exitoso. Puede iniciar sesión ahora.", 'success')
            return redirect(url_for('login'))
        except IntegrityError:
            #db.session.rollback()#
            flash("Email ya registrado. Por favor pruebe con otro.")

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = Users.query.filter_by(email=email, password=password).first()

        if user:
            session['user_id'] = user.id
            flash("Inicio de sesión exitoso.", 'success')
            return redirect(url_for('home'))
        else:
            flash("Email o contraseña incorrectos")

    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)

