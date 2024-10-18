const Handlebars = require('handlebars');

module.exports = {
    alert: (type, message) => {
        return new Handlebars.SafeString(`
            <div class="alert alert-${type}" role="alert">
                ${message}
            </div>
        `);
    }
};
