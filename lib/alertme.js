const axios = require('axios');
const version = require('../package.json').version;

const Alertme = function(apiKey) {
  
    this.apiKey = apiKey || process.env.ALERTME_API_KEY;
    this.serviceUrl = process.env.ALERTME_API_URL || 'https://api.alertmehub.com/api/v1';
  
    if (typeof this.apiKey === 'undefined') {
      throw new Error('Alertme client requires an API Key.');
    }
    
    this.httpClient = axios.create({
        baseURL: this.serviceUrl,
        timeout: 1000,
        headers: {
            'Authorization': this.apiKey,
            'User-Agent': `alertme-api-node/${version} node.js/${process.version}`,
            'Content-Type': 'application/json'
        }
    });
        
    this.getSubscriberToken = function(userId) {
        return this.httpClient.get("subscriber/token/" + userId ).then(result => result.data);
    }
    
    this.publishAlert = function(topic, options) {
        const alert = {topic: topic, ...options};
        return this.httpClient.post("alert", alert);
    }
};

  
module.exports = Alertme;