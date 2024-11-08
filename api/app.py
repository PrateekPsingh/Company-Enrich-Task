from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  


PDL_API_URL = "https://api.peopledatalabs.com/v5/company/enrich"


PDL_API_KEY = os.getenv("PDL_API_KEY", "bd16e9c4a343023f4f0b8f4875051131ceb9aba47c470508b52838f16bb46264")

@app.route('/api/enrich', methods=['POST'])
def enrich():
   
    data = request.json
    company_name = data.get('company_name')
    website = data.get('website')

    
    if not company_name:
        return jsonify({'error': 'Company name is required'}), 400
    if not website:
        return jsonify({'error': 'Website URL is required'}), 400

   
    params = {
        'name': company_name,
        'website': website
    }
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
        "X-API-Key": PDL_API_KEY
    }

    
    try:
        response = requests.get(PDL_API_URL, headers=headers, params=params)
        response.raise_for_status()  
        company_data = response.json()

        
        return jsonify(company_data), 200
    except requests.RequestException as e:
        return jsonify({'error': 'Failed to fetch data from People Data Labs'}), 500

if __name__ == '__main__':
    app.run(debug=True)
