from stl import mesh
import numpy
from flask import Flask, request, jsonify
import tempfile
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todos los endpoints

# Aumenta el límite de carga a 16 MB (puedes ajustar según sea necesario)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route('/process-stl', methods=['POST'])
def process_stl():
    try:
        file = request.files['file']

        # Guardar el archivo temporalmente
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            file.save(temp_file.name)

        # Cargar el archivo desde la ruta temporal
        your_mesh = mesh.Mesh.from_file(temp_file.name)

        # Obtener el volumen
        volume = your_mesh.get_mass_properties()[0]

        # Eliminar el archivo temporal después de usarlo
        os.remove(temp_file.name)

        return jsonify({'volume': volume})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
